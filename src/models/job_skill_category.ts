/** @format */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Job, Skills } from '.';

@Entity('job_skill_category')
export class JobSkillCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    name: 'job_id',
  })
  jobId!: string;

  @Column({
    type: 'varchar',
    name: 'skill_id',
  })
  skillId!: string;

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

  @ManyToOne(() => Job, (job) => job.skills)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  job: Job;

  @ManyToOne(() => Skills, (skill) => skill.skills)
  @JoinColumn({ name: 'skill_id', referencedColumnName: 'id' })
  skill: Skills;
}
