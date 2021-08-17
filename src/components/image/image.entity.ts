import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity("image")
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  fieldname: string;

  @Column("varchar")
  mimetype: string;

  @Column("varchar")
  originalname: string;

  @Column("varchar")
  encoding: string;

  @Column("integer")
  size: number;
}
