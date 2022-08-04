/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Courses1659482205775 implements MigrationInterface {
  userTable = new Table({
    name: "course",
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "owner_id",
        type: "uuid",
        default: null
      },
      {
        name: "name",
        type: "varchar",
        default: null,
      },
      {
        name: "metadata",
        type: "varchar",
        default: null,
      },
      {
        name: "approved_by",
        type: "varchar",
        default: null,
      },
      {
        name: "approved_at",
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
      "course",
      new TableForeignKey({
        columnNames: ["owner_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user"
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
