import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entities/user.entity';
import { RoleModule } from 'src/models/role/role.module';
import { Role } from 'src/models/role/entities/role.entity';
import { Permission } from 'src/models/permission/entities/permission.entity';
import { PermissionModule } from 'src/models/permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    forwardRef(() => RoleModule),
    forwardRef(() => PermissionModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
