import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('apply_job')
export class ApplyJob extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: null })
  user_id!: string;

  @Column({ default: null })
  job_id!: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt!: Date;
}
