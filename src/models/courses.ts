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
import { User } from '.';
import { CourseCategory } from './course_category';

@Entity('course')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  author_id!: string;

  @Column()
  course_category_id!: string;

  @Column()
  state!: string;

  @Column()
  status!: string;

  @Column()
  image!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  metadata!: string;

  @Column()
  published_by!: string;

  @Column()
  approved_by!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  published_at!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  approved_at!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date;

  @ManyToOne(() => CourseCategory, (category) => category)
  @JoinColumn({ name: 'course_category_id', referencedColumnName: 'id' })
  course_category: CourseCategory;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: User;
}
