import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  BeforeInsert,
  Index,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  first_name!: string;

  @Column({ default: null })
  last_name!: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column({ default: null })
  bio!: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(this.password, password);
  };

  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  @Column()
  user_role: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  verified_at!: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date;
}
