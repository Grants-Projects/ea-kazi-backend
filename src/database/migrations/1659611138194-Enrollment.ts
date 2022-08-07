import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class Enrollment1659611138194 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'enrollment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'trainee_id',
                    type: 'uuid',
                    default: null,
                },
                {
                    name: 'course_batch_id',
                    type: 'uuid',
                    default: null,
                },
                {
                    name: 'start_at',
                    type: 'timestamp',
                    default: null,
                },
                {
                    name: 'end_at',
                    type: 'timestamp',
                    default: null,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        });

        await queryRunner.createTable(table, true);

        await queryRunner.createForeignKey(
            'enrollment',
            new TableForeignKey({
                columnNames: ['course_batch_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'course_batch',
            })
        );

        await queryRunner.createForeignKey(
            'enrollment',
            new TableForeignKey({
                columnNames: ['trainee_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('enrollment');
    }
}
