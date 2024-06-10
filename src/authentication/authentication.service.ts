import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login-dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { jwtConstants } from 'src/constants/jwtConstants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const checkUser = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!checkUser) {
      throw new UnauthorizedException();
    } else {
      if (
        checkUser &&
        (await bcrypt.compare(loginDto.password, (await checkUser).password))
      ) {
        const payload = {
          username: (await checkUser).email,
          sub: (await checkUser).id,
        };

        const access_token = this.jwtService.sign(payload);
        const referenceToken = this.jwtService.sign(payload, {
          secret: jwtConstants.referSec,
          expiresIn: '7d',
        });
        await this.usersRepository.update(payload.sub, {
          rToken: referenceToken,
        });
        return {
          access_token,
          referenceToken,
        };
      } else {
        return 'password is incorrect';
      }
    }
  }

  async refreshToken(userId: number, rt: string) {
    console.log('user id    ' + userId);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new ForbiddenException('access denied');
    if (user.rToken === rt) {
      const payload = { username: user.email, sub: user.id };

      const access_token = this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new ForbiddenException('access denies');
    }
  }
}
