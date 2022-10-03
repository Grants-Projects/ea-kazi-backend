import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateJob1660219541659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `job` add column `location` VARCHAR(45) NOT NULL after culture'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `job` drop column location');
  }
}
