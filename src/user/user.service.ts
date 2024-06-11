import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user-dtos';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user-dtos';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async createUser(createUserdto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserdto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    if (createUserdto.password !== createUserdto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    createUserdto.password = await bcrypt.hash(createUserdto.password, 10);
    const { confirmPassword, ...updateData } = createUserdto;
    console.log(confirmPassword);

    const userRoleId = await this.roleService.getRoleId(createUserdto.role);
    const user = new User();
    user.email = updateData.email;
    user.name = updateData.name;
    user.password = updateData.password;
    user.role = userRoleId;
    return this.usersRepository.save(user);
  }

  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: updateUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    if (updateUserDto.password !== updateUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    const { confirmPassword, ...updateData } = updateUserDto;
    console.log(confirmPassword);
    const userRoleId = await this.roleService.getRoleId(updateUserDto.role);
    const user = new User();
    user.email = updateData.email;
    user.name = updateData.name;
    user.password = updateData.password;
    user.role = userRoleId;
    return this.usersRepository.update(userId, user);
  }

  async getUser(userId: number) {
    return await this.usersRepository.findOne({ where: { id: userId } });
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async deleteUser(userId: number) {
    return await this.usersRepository.delete(userId);
  }
}
