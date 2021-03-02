import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Stakeholder } from './Stakeholder'

@Entity()
export class UserNeed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Stakeholder, (stakeholder: Stakeholder) => stakeholder.id, { eager: true })
  stakeholder: Stakeholder

}
