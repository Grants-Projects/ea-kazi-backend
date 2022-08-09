/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class job1659977064328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "job",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "user_id",
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
      "job",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("job");
  }
}
