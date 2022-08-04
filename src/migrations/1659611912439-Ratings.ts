/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Ratings1659611912439 implements MigrationInterface {
  userTable = new Table({
    name: "rating",
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "enrollment_id",
        type: "uuid",
        default: null,
      },
      {
        name: "score",
        type: "integer",
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

    await queryRunner.createForeignKey(
      "enrollment",
      new TableForeignKey({
        columnNames: ["enrollment_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "enrollment",
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
