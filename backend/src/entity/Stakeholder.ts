import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { UserNeed } from './UserNeed'

@Entity()
export class Stakeholder {

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

  @OneToMany(() => UserNeed, (userNeed: UserNeed) => userNeed.stakeholder)
  userNeeds: UserNeed[]

}
