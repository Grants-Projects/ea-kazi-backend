import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class Courses1659482205775 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'course',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'author_id',
                    type: 'uuid',
                    default: null,
                },
                {
                    name: 'state',
                    type: 'varchar',
                    default: null,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: null,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    default: null,
                },
                {
                    name: 'description',
                    type: 'longtext',
                    default: null,
                },
                {
                    name: 'metadata',
                    type: 'varchar',
                    default: null,
                },
                {
                    name: 'published_by',
                    type: 'uuid',
                    default: null,
                },
                {
                    name: 'approved_by',
                    type: 'uuid',
                    default: null,
                },
                {
                    name: 'published_at',
                    type: 'timestamp',
                    default: null,
                },
                {
                    name: 'approved_at',
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
            'course',
            new TableForeignKey({
                columnNames: ['author_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
            })
        );

        await queryRunner.createForeignKey(
            'course',
            new TableForeignKey({
                columnNames: ['published_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
            })
        );

        await queryRunner.createForeignKey(
            'course',
            new TableForeignKey({
                columnNames: ['approved_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('course');
    }
}
