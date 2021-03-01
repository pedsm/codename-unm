import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserNeed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

}
