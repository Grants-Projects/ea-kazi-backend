import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class applyJob1665482292448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'apply_job',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'job_id',
          type: 'varchar',
          default: null,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        },
        {
          name: 'user_id',
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

    await queryRunner.createForeignKey(
      'apply_job',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      })
    );
    await queryRunner.createForeignKey(
      'apply_job',
      new TableForeignKey({
        columnNames: ['job_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'job',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apply_job');
  }
}
