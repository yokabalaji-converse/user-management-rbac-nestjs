import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role-dto';
import { RoleService } from './role.service';
import { PoliciesGuard } from 'src/abilities/policies.guard';
import { CheckPolicies } from 'src/abilities/policies.decorator';
import { AppAbility } from 'src/abilities/ability';
import { PermissionService } from 'src/permission/permission.service';
import { UserService } from 'src/user/user.service';


@Controller('role')
export class RoleController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
  ) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('create', 'Role'))
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
