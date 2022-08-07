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
        name: "first_name",
        type: "varchar",
      },
      {
        name: "last_name",
        type: "varchar",
      },
      {
        name: "bio",
        type: "varchar",
        isNullable: true,
      },
      {
        name: "status",
        type: "enum",
        enum: ["VERIFIED", "BLOCKED", "NOT_VERIFIED"],
      },
      {
        name: "email",
        type: "varchar",
      },
      {
        name: "verified_at",
        type: "timestamp",
        isNullable: true,
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
