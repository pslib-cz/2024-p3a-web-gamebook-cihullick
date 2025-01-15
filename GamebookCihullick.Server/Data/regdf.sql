BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Achievements" (
	"AchievementID"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Description"	TEXT,
	CONSTRAINT "PK_Achievements" PRIMARY KEY("AchievementID" AUTOINCREMENT),
	CONSTRAINT "FK_Achievements_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Customers" (
	"CustomerID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Budget"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	CONSTRAINT "PK_Customers" PRIMARY KEY("CustomerID" AUTOINCREMENT),
	CONSTRAINT "FK_Customers_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Images" (
	"ImageID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"PathToFile"	TEXT,
	CONSTRAINT "PK_Images" PRIMARY KEY("ImageID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Inventories" (
	"InventoryID"	INTEGER NOT NULL,
	"Name"	TEXT,
	"Type"	INTEGER NOT NULL,
	"ImageID"	INTEGER NOT NULL,
	"LocationID"	INTEGER NOT NULL,
	CONSTRAINT "PK_Inventories" PRIMARY KEY("InventoryID" AUTOINCREMENT),
	CONSTRAINT "FK_Inventories_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE,
	CONSTRAINT "FK_Inventories_Locations_LocationID" FOREIGN KEY("LocationID") REFERENCES "Locations"("LocationID") ON DELETE CASCADE
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
	"BlockedLocationID"	INTEGER,
	"RequiredItemID"	INTEGER,
	"Dialog"	TEXT,
	CONSTRAINT "PK_NPCs" PRIMARY KEY("NPCID" AUTOINCREMENT),
	CONSTRAINT "FK_NPCs_Locations_BlockedLocationID" FOREIGN KEY("BlockedLocationID") REFERENCES "Locations"("LocationID"),
	CONSTRAINT "FK_NPCs_Images_ImageID" FOREIGN KEY("ImageID") REFERENCES "Images"("ImageID") ON DELETE CASCADE,
	CONSTRAINT "FK_NPCs_Locations_LocationID" FOREIGN KEY("LocationID") REFERENCES "Locations"("LocationID") ON DELETE CASCADE,
	CONSTRAINT "FK_NPCs_Items_RequiredItemID" FOREIGN KEY("RequiredItemID") REFERENCES "Items"("ItemID")
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
INSERT INTO "Customers" VALUES (1,'Mrs Bobullete',3000,16);
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
INSERT INTO "Images" VALUES (11,'Coop entrance','coopentrance');
INSERT INTO "Images" VALUES (12,'Buy Items','coopshelfcustomermode');
INSERT INTO "Images" VALUES (13,'Factorio','factorio');
INSERT INTO "Images" VALUES (14,'Work','coopwork');
INSERT INTO "Images" VALUES (15,'Juicy jelly bean','jbean');
INSERT INTO "Images" VALUES (16,'Mrs Bobullete','mrsbobullete');
INSERT INTO "Inventories" VALUES (1,'Buy Items',1,12,6);
INSERT INTO "Items" VALUES (1,9,'Golden jelly bean','A nice cozy golden jelly bean.',98327732,0,0);
INSERT INTO "Items" VALUES (2,8,'Higgs boson','A nice cozy Higgs boson.',873264356,0,0);
INSERT INTO "Items" VALUES (3,13,'Factorio','A nice cozy factorio.',40,0,0);
INSERT INTO "Items" VALUES (4,7,'Bread','A nice cozy bread.',2,1,80);
INSERT INTO "Items" VALUES (5,15,'Juicy jelly bean','A nice cozy juicy jelly bean.',5,1,53);
INSERT INTO "LocationConnections" VALUES (1,2);
INSERT INTO "LocationConnections" VALUES (2,1);
INSERT INTO "LocationConnections" VALUES (2,3);
INSERT INTO "LocationConnections" VALUES (3,2);
INSERT INTO "LocationConnections" VALUES (3,4);
INSERT INTO "LocationConnections" VALUES (4,3);
INSERT INTO "LocationConnections" VALUES (4,5);
INSERT INTO "LocationConnections" VALUES (5,4);
INSERT INTO "LocationConnections" VALUES (2,6);
INSERT INTO "LocationConnections" VALUES (6,2);
INSERT INTO "LocationConnections" VALUES (7,6);
INSERT INTO "LocationConnections" VALUES (6,7);
INSERT INTO "Locations" VALUES (1,1,'House','A nice cozy house.');
INSERT INTO "Locations" VALUES (2,2,'Street','A nice cozy street.');
INSERT INTO "Locations" VALUES (3,3,'Garden','A nice cozy garden.');
INSERT INTO "Locations" VALUES (4,4,'Space','A nice cozy space.');
INSERT INTO "Locations" VALUES (5,5,'Black hole','A nice cozy black hole.');
INSERT INTO "Locations" VALUES (6,11,'Coop Shop','A nice cozy Coop shop.');
INSERT INTO "Locations" VALUES (7,15,'Work','A nice cozy work.');
INSERT INTO "NPCs" VALUES (1,6,'Jim Boring',4,5,1,'[
    {
        "id": 0,
        "text": "Hello there, traveler! I need the Golden Jelly Bean. Can you bring it to me?",
        "options": [
            "I''ll bring it to you.",
            "Sorry, I can''t help right now."
        ]
    },
    {
        "id": 1,
        "text": "Have you found the Golden Jelly Bean for me yet?",
        "options": [
            "Yes, here it is.",
            "Let me leave for now."
        ]
    },
    {
        "id": 2,
        "text": "Thank you for bringing me the Golden Jelly Bean! I won''t forget this kindness.",
        "options": [
            "Goodbye."
        ]
    }
]');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250114232748_Bobullete','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250113214453_Maragagin','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250112130517_AAAAAA','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110203244_ImagePlease','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110081929_Images11','9.0.0');
INSERT INTO "__EFMigrationsHistory" VALUES ('20250110072158_Images1','9.0.0');
CREATE INDEX IF NOT EXISTS "IX_Achievements_ImageID" ON "Achievements" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_Customers_ImageID" ON "Customers" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_Inventories_ImageID" ON "Inventories" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_Inventories_LocationID" ON "Inventories" (
	"LocationID"
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
CREATE INDEX IF NOT EXISTS "IX_NPCs_BlockedLocationID" ON "NPCs" (
	"BlockedLocationID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_ImageID" ON "NPCs" (
	"ImageID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_LocationID" ON "NPCs" (
	"LocationID"
);
CREATE INDEX IF NOT EXISTS "IX_NPCs_RequiredItemID" ON "NPCs" (
	"RequiredItemID"
);
COMMIT;
