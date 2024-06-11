import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission: boolean;

  @Column()
  action: string;

  @Column()
  model: string;

  @ManyToMany(() => Role, (role) => role.permissions) // Many-to-Many relationship
  roles: Role[];
}
