BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Achievement" (
	"AchievementID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	CONSTRAINT "PK_Achievement" PRIMARY KEY("AchievementID" AUTOINCREMENT),
	CONSTRAINT "FK_Achievement_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
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
CREATE TABLE IF NOT EXISTS "LocationConnections" (
	"LocationID"	INTEGER NOT NULL,
	"ConnectedLocationID"	INTEGER NOT NULL,
	"LocationConnectionID"	INTEGER NOT NULL,
	CONSTRAINT "PK_LocationConnections" PRIMARY KEY("LocationID","ConnectedLocationID"),
	CONSTRAINT "FK_LocationConnections_Locations_ConnectedLocationID" FOREIGN KEY("ConnectedLocationID") REFERENCES "Locations"("LocationID") ON DELETE RESTRICT,
	CONSTRAINT "FK_LocationConnections_Locations_LocationID" FOREIGN KEY("LocationID") REFERENCES "Locations"("LocationID") ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS "Locations" (
	"LocationID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	CONSTRAINT "PK_Locations" PRIMARY KEY("LocationID" AUTOINCREMENT),
	CONSTRAINT "FK_Locations_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "NPCs" (
	"NPCID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"LocationID"	INTEGER NOT NULL,
	"LocationConnectionID"	INTEGER NOT NULL,
	"LocationConnectionLocationID"	INTEGER NOT NULL,
	"LocationConnectionConnectedLocationID"	INTEGER NOT NULL,
	"RequiredItemID"	INTEGER NOT NULL,
	"Dialog"	TEXT,
	CONSTRAINT "PK_NPCs" PRIMARY KEY("NPCID" AUTOINCREMENT),
	CONSTRAINT "FK_NPCs_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE,
	CONSTRAINT "FK_NPCs_LocationConnections_LocationConnectionLocationID_LocationConnectionConnectedLocationID" FOREIGN KEY("LocationConnectionLocationID","LocationConnectionConnectedLocationID") REFERENCES "LocationConnections"("LocationID","ConnectedLocationID") ON DELETE CASCADE,
	CONSTRAINT "FK_NPCs_Locations_LocationID" FOREIGN KEY("LocationID") REFERENCES "Locations"("LocationID") ON DELETE CASCADE,
	CONSTRAINT "FK_NPCs_Items_RequiredItemID" FOREIGN KEY("RequiredItemID") REFERENCES "Items"("ItemID") ON DELETE CASCADE
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
INSERT INTO "Achievement" VALUES (1,10,'Adventurer','A nice cozy adventurer achievement.');
INSERT INTO "Images" VALUES (1,'House','uploads/house.webp');
INSERT INTO "Images" VALUES (2,'Street','uploads/street.webp');
INSERT INTO "Images" VALUES (3,'Garden','uploads/garden.webp');
INSERT INTO "Images" VALUES (4,'Space','uploads/space.webp');
INSERT INTO "Images" VALUES (5,'Black Hole','uploads/blackhole.webp');
INSERT INTO "Images" VALUES (6,'Jim Boring','uploads/jimboring.webp');
INSERT INTO "Images" VALUES (7,'Bread','uploads/bread.webp');
INSERT INTO "Images" VALUES (8,'Higgs boson','uploads/higgsboson.webp');
INSERT INTO "Images" VALUES (9,'Golden jelly bean','uploads/goldenjellybean.webp');
INSERT INTO "Images" VALUES (10,'Adventurer achievement','uploads/adventurerA.webp');
INSERT INTO "LocationConnections" VALUES (1,2,1);
INSERT INTO "LocationConnections" VALUES (2,1,1);
INSERT INTO "LocationConnections" VALUES (1,3,2);
INSERT INTO "LocationConnections" VALUES (3,1,2);
INSERT INTO "Locations" VALUES (1,1,'House','A nice cozy house.');
INSERT INTO "Locations" VALUES (2,2,'Street','A nice cozy street.');
INSERT INTO "Locations" VALUES (3,3,'Garden','A nice cozy garden.');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110081929_Images11','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110072158_Images1','9.0.0');
CREATE INDEX IF NOT EXISTS "IX_Achievement_ImageID" ON "Achievement" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_Items_ImageID" ON "Items" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_LocationConnections_ConnectedLocationID" ON "LocationConnections" (
	"ConnectedLocationID"
);
CREATE INDEX IF NOT EXISTS "IX_Locations_ImageID" ON "Locations" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_ImageID" ON "NPCs" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_LocationConnectionLocationID_LocationConnectionConnectedLocationID" ON "NPCs" (
	"LocationConnectionLocationID",
	"LocationConnectionConnectedLocationID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_LocationID" ON "NPCs" (
	"LocationID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_RequiredItemID" ON "NPCs" (
	"RequiredItemID"
);
COMMIT;
