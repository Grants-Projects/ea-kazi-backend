import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    BaseEntity,
  } from 'typeorm'
  
  @Entity('job')
  export class Job extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    recruiter_id!: string;

    @Column()
    state!: string;

    @Column()
    status!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @CreateDateColumn({
      type: 'timestamp',
    })
    expires_at!: Date;

    @Column()
    approved_by!: string;

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
  }
