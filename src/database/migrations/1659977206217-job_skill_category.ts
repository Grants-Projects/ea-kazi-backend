/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class jobSkillCategory1659977206217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "job_skill_category",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "job_id",
          type: "uuid",
          default: null,
        },
        {
          name: "skill_id",
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
      "job_skill_category",
      new TableForeignKey({
        columnNames: ["job_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "job",
      })
    );
    await queryRunner.createForeignKey(
      "job_skill_category",
      new TableForeignKey({
        columnNames: ["skill_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "skill_category",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("job_skill_category");
  }
}
