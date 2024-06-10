import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login-dtos';
import { AuthenticationService } from './authentication.service';
import { Public } from 'src/decorators/public-decorator';
import { RtAuthGuard } from 'src/guards/rt-jwt-guard';
import { GetCurrentUser } from 'src/decorators/rt-get-current-user-deco';
import { GetCurrentUserId } from 'src/decorators/rt-get-current-userId-deco';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return await this.authService.refreshToken(userId, refreshToken);
  }
}
