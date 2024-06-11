import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role-dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoledto: CreateRoleDto) {
    return await this.roleRepository.save(createRoledto);
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
    return await this.roleRepository.findOne({ where: { role: roleName } });
  }
}
