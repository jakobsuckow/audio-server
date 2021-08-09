import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("audio")
export class AudioEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fieldname: string;

  @Column()
  originalname: string;

  @Column()
  encoding: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
}
