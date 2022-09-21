import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Column,
  Index,
} from "typeorm";
import Result from "./Result";

@Entity({ name: "reference" })
export default class Reference {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column({ type: "varchar" })
  url: string;

  @OneToMany(() => Result, (result) => result.reference)
  results: Result[];

  @Index("IX_reference_created_at")
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @DeleteDateColumn({
    type: "timestamp",
    precision: 0,
    nullable: true,
  })
  deleted_at: Date;
}
