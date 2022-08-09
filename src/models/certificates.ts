import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	BaseEntity,
} from 'typeorm';

@Entity('certificate')
export class Certificate extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	user_id!: string;

	@Column()
	token!: string;

	@CreateDateColumn({
		type: 'timestamp',
	})
	created_at!: Date;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	updated_at!: Date;
}
