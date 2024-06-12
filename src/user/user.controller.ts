import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dtos';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user-dtos';
import { Public } from 'src/decorators/public-decorator';
import { RoleService } from 'src/role/role.service';
import { PermissionService } from 'src/permission/permission.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
  ) {}

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Get('/:userId')
  getId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId);
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Delete(':userId')
  deleteUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
