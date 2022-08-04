/** @format */

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1659482181387 implements MigrationInterface {
  userTable = new Table({
    name: "user",
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "firstname",
        type: "varchar",
        default: null,
      },
      {
        name: "lastname",
        type: "varchar",
        default: null,
      },
      {
        name: "bio",
        type: "varchar",
        default: null,
      },
      {
        name: "status",
        type: "enum",
        enum: ["VERIFIED", "BLOCKED", "NOT_VERIFIED"],
      },
      {
        name: "email",
        type: "varchar",
        default: null,
      },
      {
        name: "verifiedAt",
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

    // await queryRunner.createIndex(
    //   "question",
    //   new TableIndex({
    //     name: "IDX_QUESTION_NAME",
    //     columnNames: ["name"],
    //   })
    // );

    // await queryRunner.createForeignKey(
    //   "answer",
    //   new TableForeignKey({
    //     columnNames: ["questionId"],
    //     referencedColumnNames: ["id"],
    //     referencedTableName: "question",
    //     onDelete: "CASCADE",
    //   })
    // );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable)
  }
}
