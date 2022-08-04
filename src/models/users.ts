import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  firstname!: string

  @Column()
  lastname!: string

  @Column()
  email!: string

  @Column()
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
  verifiedAt!: Date

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date

}