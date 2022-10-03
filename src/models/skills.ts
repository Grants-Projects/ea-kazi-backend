import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { JobSkillCategory } from '.';

@Entity('skill_category')
export class Skills extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description: string;

  @Column()
  thumbnail_image: string;

  @Column()
  image: string;

  @Column()
  position: number;

  @Column()
  parent_id: number;

  @Column()
  is_active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date;

  @OneToMany(() => JobSkillCategory, (skill) => skill.job)
  skills: JobSkillCategory[];
}
