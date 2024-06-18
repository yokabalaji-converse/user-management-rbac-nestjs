import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../models/user/user.module';
import { User } from '../models/user/entities/user.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../common/guards/jwt-auth-guard';
import { EmailModule } from '../email/email.module';
import { Role } from '../models/role/entities/role.entity';
import { Permission } from '../models/permission/entities/permission.entity';
import { RoleModule } from '../models/role/role.module';
import { PermissionModule } from '../models/permission/permission.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'usermanagementcheck',
      entities: [User, Role, Permission],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Role, Permission]),
    UserModule,
    AuthenticationModule,
    EmailModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
