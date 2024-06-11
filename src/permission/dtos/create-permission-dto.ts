import { IsBoolean, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsBoolean()
  permission: boolean;

  @IsString()
  action: string;

  @IsString()
  model: string;
}
