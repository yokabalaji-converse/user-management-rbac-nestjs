import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from 'src/models/role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/models/permission/permission.module';
import { Permission } from 'src/models/permission/entities/permission.entity';
import { AbilityModule } from 'src/common/abilities/ability.module';
import { UserModule } from 'src/models/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission]),
    forwardRef(() => PermissionModule),
    AbilityModule,
    forwardRef(() => UserModule),
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
