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
import { CourseStatus } from '../common/types/status';
import { Course } from './courses';
import { Job } from './jobs';
import { User } from './users';

@Entity('apply_courses')
export class ApplyCourse extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'user_id' })
  userId!: string;

  @Column({ type: 'varchar', name: 'course_id' })
  courseId!: string;

  @Column({
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.PENDING,
  })
  status!: CourseStatus;

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
  
  @ManyToOne(() => Course, (course) => course)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;
}
