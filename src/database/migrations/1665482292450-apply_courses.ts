import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class ApplyCourses1665482292450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'apply_courses',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'course_id',
          type: 'varchar',
          default: null,
        },
        {
          name: 'user_id',
          type: 'varchar',
          default: null,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['PENDING', 'ACCEPTED', 'COMPLETED'],
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
      'apply_courses',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      })
    );
    await queryRunner.createForeignKey(
      'apply_courses',
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apply_courses');
  }
}
