import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    BaseEntity,
  } from 'typeorm'
  
  @Entity('course')
 export class Course extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    owner_id!: string
  
    @Column()
    name!: string
  
    @Column()
    metadata!: string
  
    @Column()
    approvedBy!: string
  
    @CreateDateColumn({
        type: 'timestamp',
    })
    approvedAt!: Date
    
    @CreateDateColumn({
      type: 'timestamp',
    })
    createdAt!: Date
  
    @UpdateDateColumn({
      type: 'timestamp',
    })
    updatedAt!: Date
  }
