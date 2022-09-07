/** @format */

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class job1659977064328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'job',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'recruiter_id',
          type: 'varchar',
        },
        {
          name: 'state',
          type: 'varchar',
          default: null,
          isNullable: true,
        },
        {
          name: 'status',
          type: 'varchar',
          default: null,
          isNullable: true,
        },
        {
          name: 'title',
          type: 'varchar',
          default: null,
        },
        {
          name: 'description',
          type: 'varchar',
          default: null,
        },
        {
          name: 'expires_at',
          type: 'timestamp',
          default: null,
          isNullable: true,
        },
        {
          name: 'approved_by',
          type: 'varchar',
          default: null,
          isNullable: true,
        },
        {
          name: 'approved_at',
          type: 'timestamp',
          default: null,
          isNullable: true,
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
      'job',
      new TableForeignKey({
        columnNames: ['recruiter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      })
    );

    await queryRunner.createForeignKey(
      'job',
      new TableForeignKey({
        columnNames: ['approved_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job');
  }
}
