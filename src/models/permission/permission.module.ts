import { Module, forwardRef } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from 'src/models/permission/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/models/role/role.module';
import { Role } from 'src/models/role/entities/role.entity';
import { AbilityModule } from 'src/common/abilities/ability.module';
import { UserModule } from 'src/models/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role]),
    forwardRef(() => RoleModule),
    AbilityModule,
    forwardRef(() => UserModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
