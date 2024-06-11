import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  role: string;
}
