/** @format */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class skillCategory1659976258492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "skill_category",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid",
        },
        {
          name: "title",
          type: "varchar",
          default: null,
        },
        {
          name: "description",
          type: "longtext",
          default: null,
        },
        {
          name: "thumbnail_image",
          type: "varchar",
          default: null,
        },
        {
          name: "image",
          type: "varchar",
          default: null,
        },
        {
          name: "position",
          type: "integer",
          default: null,
        },
        {
          name: "parent_id",
          type: "integer",
          default: null,
        },
        {
          name: "is_active",
          type: "tinyint",
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("skill_category");
  }
}
