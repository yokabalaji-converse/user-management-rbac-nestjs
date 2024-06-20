import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/models/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../data-transfer-objects/create-role-dto';
import { Permission } from 'src/models/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const { name, permissions } = createRoleDto;

    const checkRole = await this.roleRepository.findOne({
      where: { name: name },
    });
    console.log(checkRole);
    if (checkRole) {
      throw new ConflictException('This user already exists');
    } else {
      const permissionConditions = await permissions.map(
        ({ action, model }) => ({
          action,
          model,
        }),
      );

      const permissionEntities = await this.permissionRepository.find({
        where: permissionConditions,
      });
      console.log(permissionEntities);
      const role = await this.roleRepository.create({
        name,
        permissions: permissionEntities,
      });
      return await this.roleRepository.save(role);
    }
  }

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find({ relations: ['permissions'] });
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
