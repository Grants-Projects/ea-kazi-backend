import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { STATUS } from '../common/types/status';
import { Job } from './jobs';
import { User } from './users';

@Entity('apply_job')
export class ApplyJob extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: null })
  user_id!: string;

  @Column({ default: null })
  job_id!: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
  })
  status!: STATUS;

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

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Job, (job) => job)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  job: Job;
}
