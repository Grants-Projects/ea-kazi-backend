import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRole1660219541657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `user` add column user_role VARCHAR(45) NULL after status'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `user` drop column user_role');
  }
}
