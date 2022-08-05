/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CourseBatch1659610621656 implements MigrationInterface {
  userTable = new Table({
    name: "course_batch",
    columns: [
      {
        name: "id",
        type: "uuid",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid",
      },
      {
        name: "course_id",
        type: "uuid",
        default: null,
      },
      {
        name: "start_at",
        type: "timestamp",
        default: null,
      },
      {
        name: "end_at",
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
      "course_batch",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "course",
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
