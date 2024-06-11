import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dtos/create-permission-dto';
import { UpdatePermissionDto } from './dtos/update-permission-dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}
  async createPermission(createPermissionDto: CreatePermissionDto) {
    return await this.permissionRepo.save(createPermissionDto);
  }

  async updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionRepo.update(id, updatePermissionDto);
  }
}
