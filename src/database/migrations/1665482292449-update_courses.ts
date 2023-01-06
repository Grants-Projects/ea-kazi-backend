import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCourses1665482292449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `course` add column `image` VARCHAR(225) NOT NULL after status'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `course` drop column image');
  }
}
