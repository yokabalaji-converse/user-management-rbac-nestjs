import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission: boolean;

  @Column()
  action: string;

  @Column()
  model: string;
}
