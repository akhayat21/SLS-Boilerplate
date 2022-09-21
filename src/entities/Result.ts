import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Reference from "./Reference";

interface MetaTags {
  name?: string;
  content?: string;
}

export interface ResultData {
  title?: string;
  metaTags?: MetaTags[];
}

@Entity({ name: "result" })
export default class Result {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @ManyToOne(() => Reference, (reference) => reference.id, {
    cascade: true,
    onDelete: "CASCADE",
    orphanedRowAction: "soft-delete",
  })
  @JoinColumn({ name: "reference_id", referencedColumnName: "id" })
  reference: Reference;

  @Column({ type: "jsonb" })
  data: ResultData;

  @Index("IX_result_created_at")
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @DeleteDateColumn({
    type: "timestamp",
    precision: 0,
    nullable: true,
  })
  deleted_at: Date;
}
