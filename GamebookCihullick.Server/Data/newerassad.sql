BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Achievements" (
	"AchievementID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	CONSTRAINT "PK_Achievements" PRIMARY KEY("AchievementID" AUTOINCREMENT),
	CONSTRAINT "FK_Achievements_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Images" (
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"PathToFile"	TEXT,
	CONSTRAINT "PK_Images" PRIMARY KEY("ImageID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Items" (
	"ItemID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	"Cost"	INTEGER NOT NULL,
	"IsEdible"	INTEGER,
	"NutritionalValue"	INTEGER,
	CONSTRAINT "PK_Items" PRIMARY KEY("ItemID" AUTOINCREMENT),
	CONSTRAINT "FK_Items_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Locations" (
	"LocationID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	CONSTRAINT "PK_Locations" PRIMARY KEY("LocationID" AUTOINCREMENT),
	CONSTRAINT "FK_Locations_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
	"MigrationId"	TEXT NOT NULL,
	"ProductVersion"	TEXT NOT NULL,
	CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY("MigrationId")
);
CREATE TABLE IF NOT EXISTS "__EFMigrationsLock" (
	"Id"	INTEGER NOT NULL,
	"Timestamp"	TEXT NOT NULL,
	CONSTRAINT "PK___EFMigrationsLock" PRIMARY KEY("Id")
);
INSERT INTO "Achievements" VALUES (1,10,'Adventurer','A nice cozy adventurer.');
INSERT INTO "Images" VALUES (1,'House','house');
INSERT INTO "Images" VALUES (2,'Street','street');
INSERT INTO "Images" VALUES (3,'Garden','garden');
INSERT INTO "Images" VALUES (4,'Space','space');
INSERT INTO "Images" VALUES (5,'Black Hole','blackhole');
INSERT INTO "Images" VALUES (6,'Jim Boring','jimboring');
INSERT INTO "Images" VALUES (7,'Bread','bread');
INSERT INTO "Images" VALUES (8,'Higgs boson','higgsboson');
INSERT INTO "Images" VALUES (9,'Golden jelly bean','goldenjellybean');
INSERT INTO "Images" VALUES (10,'Adventurer achievement','adventurerA');
INSERT INTO "Items" VALUES (1,9,'Golden jelly bean','A nice cozy golden jelly bean.',98327732,0,0);
INSERT INTO "Items" VALUES (2,8,'Higgs boson','A nice cozy Higgs boson.',87326435674573654,0,0);
INSERT INTO "Locations" VALUES (1,1,'House','A nice cozy house.');
INSERT INTO "Locations" VALUES (2,2,'Street','A nice cozy street.');
INSERT INTO "Locations" VALUES (3,3,'Garden','A nice cozy garden.');
INSERT INTO "Locations" VALUES (4,4,'Space','A nice cozy space.');
INSERT INTO "Locations" VALUES (5,5,'Black hole','A nice cozy black hole.');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110203244_ImagePlease','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110081929_Images11','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110072158_Images1','9.0.0');
CREATE INDEX IF NOT EXISTS "IX_Achievements_ImageID" ON "Achievements" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_Items_ImageID" ON "Items" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_Locations_ImageID" ON "Locations" (
	"ImageID"
);
COMMIT;
