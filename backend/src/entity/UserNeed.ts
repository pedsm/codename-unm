import { Entity, JoinColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Stakeholder } from './Stakeholder'

export enum NeedStatus {
  UNMET,
  RESEARCHING,
  PARTIALLY_MET,
  MET,
}

@Entity()
export class UserNeed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int', { default: NeedStatus.UNMET })
  status: NeedStatus

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Stakeholder, (stakeholder: Stakeholder) => stakeholder.userNeeds)
  stakeholder: Stakeholder

}
