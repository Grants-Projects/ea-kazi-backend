import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
  } from "typeorm";

export class TrainerRating1659609648011 implements MigrationInterface {
    userTable = new Table({
        name: "trainer_rating",
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
            default: null
          },
          {
            name: "course_id",
            type: "uuid",
            default: null
          },
          {
            name: "score",
            type: "integer",
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
          "trainer_rating",
          new TableForeignKey({
            columnNames: ["trainer_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user"
          })
        );

        await queryRunner.createForeignKey(
            "trainer_rating",
            new TableForeignKey({
              columnNames: ["course_id"],
              referencedColumnNames: ["id"],
              referencedTableName: "course"
            })
          );
      }
    
      async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.userTable);
      }
}