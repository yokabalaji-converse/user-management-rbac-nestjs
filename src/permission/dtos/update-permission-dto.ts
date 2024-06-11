import { IsBoolean, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsBoolean()
  permission: boolean;

  @IsString()
  action: string;

  @IsString()
  model: string;
}
