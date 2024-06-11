import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => User, (user) => user.role) // One role has many users
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles) // Many-to-Many relationship
  @JoinTable() // Add this line to create the join table
  permissions: Permission[];
}
