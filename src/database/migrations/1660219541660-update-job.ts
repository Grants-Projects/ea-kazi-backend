import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateJob1660219541660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `job` add column `image` VARCHAR(225) NOT NULL after location'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `job` drop column image');
  }
}
