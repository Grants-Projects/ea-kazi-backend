/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class Role1659614035964 implements MigrationInterface {
  userTable = new Table({
    name: "role",
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "name",
        type: "varchar",
        default: null,
      },
      {
        name: "description",
        type: "varchar",
        default: null,
      },
      {
        name: "created_at",
        type: "timestamp",
        default: "now()",
      },
      {
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      },
    ],
  });

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable, true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
