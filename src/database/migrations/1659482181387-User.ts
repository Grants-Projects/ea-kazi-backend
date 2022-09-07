import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1659482181387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userTable = new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'first_name',
          type: 'varchar',
        },
        {
          name: 'bio',
          type: 'varchar',
          isNullable: true,
          default: null,
        },
        {
          name: 'last_name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['VERIFIED', 'BLOCKED', 'NOT_VERIFIED'],
        },
        {
          name: 'verified_at',
          type: 'timestamp',
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

    await queryRunner.createTable(userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
