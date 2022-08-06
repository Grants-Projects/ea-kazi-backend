import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  Index,
} from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({default: null})
  first_name!: string

  @Column({default: null})
  last_name!: string

  @Index('email_index')
  @Column({
    unique: true,
  })  email: string

  @Column({default: null})
  bio!: string
  
  // @Column({
  //   type: 'enum',
  //   enum: ['VERIFIED', 'BLOCKED', 'NOT_VERIFIED'],
  //   default: 'NOT_VERIFIED',
  // })
  // status!: string

  @CreateDateColumn({
    type: 'timestamp',
  })
  verified_at!: Date

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date

}