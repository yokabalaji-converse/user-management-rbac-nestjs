import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role-dto';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    // return await this.roleRepository.save(createRoledto);
    const { name, permissionIds } = createRoleDto;

    const permissions =
      await this.permissionRepository.findByIds(permissionIds);

    const role = new Role();
    role.name = name;
    role.permissions = permissions;

    return this.roleRepository.save(role);
  }

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async deleteRole(id: number): Promise<string> {
    try {
      await this.roleRepository.delete(id);
      return 'role deleted succesfully';
    } catch (err) {
      return 'user is not deleted';
    }
  }

  async getRoleId(roleName: string) {
    return await this.roleRepository.findOne({ where: { name: roleName } });
  }
}
