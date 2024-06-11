import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role-dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Post()
  async createRoles(@Body() createRoledto: CreateRoleDto) {
    return await this.roleService.createRole(createRoledto);
  }

  @Get()
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.roleService.deleteRole(id);
  }
}
