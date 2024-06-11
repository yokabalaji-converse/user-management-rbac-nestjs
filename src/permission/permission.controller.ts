import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dtos/create-permission-dto';
import { UpdatePermissionDto } from './dtos/update-permission-dto';

@Controller('permission') 
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
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
