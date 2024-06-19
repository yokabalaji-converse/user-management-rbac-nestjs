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
import { PoliciesGuard } from 'src/common/abilities/policies.guard';
import { CheckPolicies } from 'src/common/abilities/policies.decorator';
import { Action, AppAbility } from 'src/common/abilities/ability';
import { PermissionService } from 'src/models/permission/permission.service';
import { UserService } from 'src/models/user/user.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
  ) {}

  @ApiSecurity('jwt-auth')
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Role))
  async createRoles(@Body() createRoledto: CreateRoleDto) {
    return await this.roleService.createRole(createRoledto);
  }

  @ApiSecurity('jwt-auth')
  @Get()
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @ApiSecurity('jwt-auth')
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.roleService.deleteRole(id);
  }
}
