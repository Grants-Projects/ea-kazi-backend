import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class userVerification1679986275877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'user_verification',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'email',
          type: 'varchar',
          default: null,
        },
        {
          name: 'otp',
          type: 'varchar',
          default: null,
        },
        {
          name: 'expires_at',
          type: 'timestamp',
          default: 'now()',
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
    await queryRunner.dropTable('user_verification');
  }
}
