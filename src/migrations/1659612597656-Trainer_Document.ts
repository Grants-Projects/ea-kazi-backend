/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class TrainerDocument1659612597656 implements MigrationInterface {
  userTable = new Table({
    name: "tainer_document",
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "trainer_id",
        type: "uuid",
        default: null,
      },
      {
        name: "doc_type",
        type: "varchar",
        default: null,
      },
      {
        name: "status",
        type: "enum",
        enum: ["VERIFIED", "BLOCKED", "NOT_VERIFIED", "PROCESSING"],
      },
      {
        name: "expiry_date",
        type: "timestamp",
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
      "tainer_document",
      new TableForeignKey({
        columnNames: ["trainer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
