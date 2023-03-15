import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class updateCourse1678877657252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'course',
      new TableColumn({
        name: 'course_category_id',
        type: 'varchar',
      })
    );

    await queryRunner.createForeignKey(
      'course',
      new TableForeignKey({
        columnNames: ['course_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course_category',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('course');
  }
}
