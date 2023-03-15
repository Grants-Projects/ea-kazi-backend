import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class updateJob1678878259951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'job',
      new TableColumn({
        name: 'job_category_id',
        type: 'varchar',
      })
    );

    await queryRunner.createForeignKey(
      'job',
      new TableForeignKey({
        columnNames: ['job_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'job_category',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job');
  }
}
