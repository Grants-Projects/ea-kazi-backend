import 'reflect-metadata'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  VersionColumn,
} from 'typeorm'

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('simple-array')
  scopes!: string[]

  @Column('firstname')
  firstname!: string

  @Column('lastname')
  lastname!: string

  @Column('email')
  email!: string
  
  @Column({
    type: 'enum',
    enum: ['TRAINER', 'TRAINEE', 'RECRUITER'],
    default: 'TRAINEE',
  })
  user_type!: string

  @Column({
    type: 'enum',
    enum: ['PENDING', 'VERIFIED', 'FAILED'],
    default: 'PENDING',
  })
  
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date

}
