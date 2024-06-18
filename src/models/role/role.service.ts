import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/models/role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role-dto';
import { Permission } from 'src/models/permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    //if you give the permissionIds use this code

    // const { name, permissionIds } = createRoleDto;

    // const permissions =
    //   await this.permissionRepository.findByIds(permissionIds);

    // const role = new Role();
    // role.name = name;
    // role.permissions = permissions;

    // return this.roleRepository.save(role);

    const { name, permissions } = createRoleDto;

    const checkRole = await this.roleRepository.findOne({
      where: { name: name },
    });
    console.log(checkRole);
    if (checkRole) {
      // Create an array of conditions for the query
      throw new ConflictException('This user already exists');
    } else {
      const permissionConditions = await permissions.map(
        ({ action, model }) => ({
          action,
          model,
        }),
      );

      // Find permissions by their actions and models
      const permissionEntities = await this.permissionRepository.find({
        where: permissionConditions,
      });
      console.log(permissionEntities);
      // Create a new role with associated permissions
      const role = await this.roleRepository.create({
        name,
        permissions: permissionEntities,
      });

      // Save the new role to the database
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
