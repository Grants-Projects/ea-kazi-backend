/** @format */

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class statusStateMapping1660212541650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "status_state_mapping",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "state",
          type: "varchar"
        },
        {
          name: "status",
          type: "varchar",
        },
        {
          name: "label",
          type: "varchar",
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

    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("status_state_mapping");
  }
}
