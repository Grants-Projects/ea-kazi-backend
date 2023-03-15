import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { JobSkillCategory, User } from '.';
import { ApplyJob } from './apply_job';
import { JobCategory } from './job_category';

export enum Culture {
  REMOTE = 'Remote',
  FULLTIME = 'Full Time',
  PARTTIME = 'Part Time ',
}

@Entity('job')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    name: 'recruiter_id',
  })
  recruiterId!: string;

  @Column()
  job_category_id!: string;

  @Column()
  state!: string;

  @Column()
  status!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    type: 'enum',
    enum: Culture,
    default: Culture.FULLTIME,
  })
  culture!: Culture;

  @Column()
  location!: string;

  @Column()
  image!: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'expires_at',
  })
  expiresAt!: Date;

  @Column({
    type: 'varchar',
    name: 'approved_by',
  })
  approvedBy!: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'approved_at',
  })
  approvedAt!: Date;

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

  @ManyToOne(() => JobCategory, (category) => category)
  @JoinColumn({ name: 'job_category_id', referencedColumnName: 'id' })
  job_category: JobCategory;

  @OneToMany((type) => JobSkillCategory, (skill) => skill.job)
  skills: JobSkillCategory[];

  @ManyToOne(() => User, (user) => user.job)
  @JoinColumn({ name: 'recruiter_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => ApplyJob, (applyJob) => applyJob.job, { cascade: true })
  applyJob: ApplyJob[];
}
