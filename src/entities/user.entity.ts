import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  tokenExpiry: Date;

  @Column({ nullable: true })
  rToken: string;

  @ManyToOne(() => Role, (role) => role.users) // Many users can have one role
  role: Role;
}
