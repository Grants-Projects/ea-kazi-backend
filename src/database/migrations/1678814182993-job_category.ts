import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class jobCategory1678814182993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'job_category',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'name',
          type: 'varchar',
          default: null,
        },
        {
          name: 'description',
          type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job_category');
  }
}
