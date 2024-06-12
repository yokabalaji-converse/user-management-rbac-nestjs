import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dtos/create-permission-dto';
import { UpdatePermissionDto } from './dtos/update-permission-dto';
import { PoliciesGuard } from 'src/abilities/policies.guard';
import { CheckPolicies } from 'src/abilities/policies.decorator';
import { AppAbility } from 'src/abilities/ability';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Controller('permission')
export class PermissionController {
  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
  ) {}

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('create', 'Permission'))
  async createPermission(@Body() createPermisionDto: CreatePermissionDto) {
    return await this.permissionService.createPermission(createPermisionDto);
  }

  @Put(':id')
  async updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionService.updatePermission(
      id,
      updatePermissionDto,
    );
  }
}
