import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1734648638330 implements MigrationInterface {
    name = 'Initial1734648638330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL, "belongsToAuthor" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "surname" varchar NOT NULL, "completeName" varchar NOT NULL, "tags" varchar NOT NULL, "isAUser" boolean NOT NULL, "userId" integer, "postId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "belongsToPost" varchar NOT NULL, "belongsToUser" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "surname" varchar NOT NULL, "completeName" varchar NOT NULL, "tags" varchar NOT NULL, "isAUser" boolean NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "FK_645811deaaaa772f9e6c2a4b927" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_39c6719b3a1950db3c887b3a314" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_author"("id", "surname", "completeName", "tags", "isAUser", "userId", "postId") SELECT "id", "surname", "completeName", "tags", "isAUser", "userId", "postId" FROM "author"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`ALTER TABLE "temporary_author" RENAME TO "author"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" RENAME TO "temporary_author"`);
        await queryRunner.query(`CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "surname" varchar NOT NULL, "completeName" varchar NOT NULL, "tags" varchar NOT NULL, "isAUser" boolean NOT NULL, "userId" integer, "postId" integer)`);
        await queryRunner.query(`INSERT INTO "author"("id", "surname", "completeName", "tags", "isAUser", "userId", "postId") SELECT "id", "surname", "completeName", "tags", "isAUser", "userId", "postId" FROM "temporary_author"`);
        await queryRunner.query(`DROP TABLE "temporary_author"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
