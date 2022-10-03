import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateJob1660219541658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `job` add column `culture` VARCHAR(45) NOT NULL after description'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `job` drop column culture');
  }
}
