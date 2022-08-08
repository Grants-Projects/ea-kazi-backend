/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class courseSkillCategory1659976635656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "course_skill_category",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "skill_id",
          type: "uuid",
          default: null,
        },
        {
          name: "course_id",
          type: "uuid",
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

    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      "course_skill_category",
      new TableForeignKey({
        columnNames: ["skill_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "skill_category",
      })
    );
    await queryRunner.createForeignKey(
      "course_skill_category",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "course",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("course_skill_category");
  }
}
