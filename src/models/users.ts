import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  BeforeInsert,
  Index,
} from 'typeorm'
import * as argon2 from 'argon2';

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

  @Column()
  password: string;
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  comparePassword = function (password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  };

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