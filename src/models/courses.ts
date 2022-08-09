import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	BaseEntity,
} from 'typeorm';

@Entity('course')
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	owner_id!: string;

	@Column()
	name!: string;

	@Column()
	metadata!: string;

	@Column()
	approved_by!: string;

	@Column({ default: false })
	is_published!: boolean;

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
