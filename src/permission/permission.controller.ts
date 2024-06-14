import {
  Body,
  Controller,
  Delete,
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
//import { Public } from 'src/decorators/public-decorator';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
  ) {}

  @ApiSecurity('jwt-auth')
  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can('create', 'Permission'))
  async createPermission(@Body() createPermisionDto: CreatePermissionDto) {
    return await this.permissionService.createPermission(createPermisionDto);
  }

  @ApiSecurity('jwt-auth')
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

  @ApiSecurity('jwt-auth')
  @Delete(':id')
  async deletePermission(@Param('id', ParseIntPipe) id: number) {
    return await this.permissionService.deletePermission(id);
  }
}
