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
INSERT INTO "Achievements" VALUES (1,10,'Adventurer','Awarded for visiting every location and uncovering the entire map.');
INSERT INTO "Customers" VALUES (1,'Mrs Bobullete',3000,16);
INSERT INTO "Customers" VALUES (2,'Jim Boring',30000000,6);
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
INSERT INTO "Images" VALUES (17,'Sheet Metal','sheetmetal');
INSERT INTO "Images" VALUES (18,'Wealthy Street','wealthystreet');
INSERT INTO "Images" VALUES (19,'Bank','bank');
INSERT INTO "Images" VALUES (20,'Bank Interior','bankinterior');
INSERT INTO "Images" VALUES (21,'Casino','casino');
INSERT INTO "Images" VALUES (22,'Gamble','therecure');
INSERT INTO "Images" VALUES (23,'Dill pickle','dillpickle');
INSERT INTO "Images" VALUES (24,'Undertale','undertale');
INSERT INTO "Images" VALUES (25,'Sprite','sprite');
INSERT INTO "Images" VALUES (26,'Bananas','bananas');
INSERT INTO "Images" VALUES (27,'Dial','dial');
INSERT INTO "Images" VALUES (28,'Apples','apples');
INSERT INTO "Images" VALUES (29,'Chocolate','chocolate');
INSERT INTO "Images" VALUES (30,'Pears','pears');
INSERT INTO "Images" VALUES (31,'Jelly beans','jellybeans');
INSERT INTO "Images" VALUES (32,'Lemons','lemons');
INSERT INTO "Images" VALUES (33,'Limes','limes');
INSERT INTO "Inventories" VALUES (1,'Buy Items',1,12,6);
INSERT INTO "Items" VALUES (1,9,'Golden jelly bean','A shiny, golden-colored jelly bean with a sweet taste.',98327732,0,0);
INSERT INTO "Items" VALUES (2,8,'Higgs boson','A mysterious particle, key to understanding the universe.',873264356,0,0);
INSERT INTO "Items" VALUES (3,13,'Factorio','A game about building factories and automating production.',40,0,0);
INSERT INTO "Items" VALUES (4,7,'Bread','A freshly baked loaf with a soft and fluffy texture.',2,1,80);
INSERT INTO "Items" VALUES (5,15,'Juicy jelly bean','A fruity jelly bean bursting with juicy flavor.',5,1,53);
INSERT INTO "Items" VALUES (6,23,'Dill pickle','A crunchy, tangy cucumber pickled with dill and spices, offering a bold and refreshing flavor.',3,1,49);
INSERT INTO "Items" VALUES (7,24,'Undertale','A unique RPG where choices truly matter, featuring memorable characters, humor, and multiple endings shaped by your actions.',30,0,0);
INSERT INTO "Items" VALUES (8,25,'Sprite','A crisp and refreshing lemon-lime soda with a bubbly, citrusy kick. Perfect for quenching thirst and adding a little fizz to your day.',7,1,27);
INSERT INTO "Items" VALUES (9,26,'Bananas','A naturally sweet and creamy fruit packed with energy and nutrients. Whether eaten fresh, blended in smoothies, or baked into treats, bananas are a versatile favorite.',4,1,88);
INSERT INTO "Items" VALUES (10,28,'Apples','A crunchy and juicy fruit available in a variety of flavors, from sweet to tart. Enjoy them fresh, baked into pies, or pressed into refreshing cider.',3,1,92);
INSERT INTO "Items" VALUES (11,29,'Chocolate','A rich and indulgent treat made from cocoa beans, enjoyed in many forms from creamy milk chocolate to intense dark varieties. Perfect for snacking, baking, or melting into a warm drink.',9,1,36);
INSERT INTO "Items" VALUES (12,30,'Pears','A juicy and sweet fruit with a soft, grainy texture and a delicate floral flavor. Great for fresh eating, poaching, or adding a refreshing twist to salads and desserts.',5,1,76);
INSERT INTO "Items" VALUES (13,31,'Jelly beans','Small, colorful candies with a chewy center and a sugary shell, bursting with a variety of fruity and unique flavors. A fun and tasty treat for any occasion.',13,1,36);
INSERT INTO "Items" VALUES (14,32,'Lemons','A bright and zesty citrus fruit known for its tart flavor and refreshing aroma. Used for cooking, baking, and making lemonade, adding a tangy kick to any dish or drink.',4,1,79);
INSERT INTO "Items" VALUES (15,33,'Limes','A vibrant green citrus fruit with a bold, tangy flavor, often used to enhance drinks, dishes, and desserts. Essential in everything from cocktails to savory marinades.',5,1,77);
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
INSERT INTO "LocationConnections" VALUES (2,8);
INSERT INTO "LocationConnections" VALUES (8,2);
INSERT INTO "LocationConnections" VALUES (9,8);
INSERT INTO "LocationConnections" VALUES (8,9);
INSERT INTO "LocationConnections" VALUES (9,10);
INSERT INTO "LocationConnections" VALUES (10,9);
INSERT INTO "LocationConnections" VALUES (8,11);
INSERT INTO "LocationConnections" VALUES (11,8);
INSERT INTO "LocationConnections" VALUES (11,12);
INSERT INTO "LocationConnections" VALUES (12,11);
INSERT INTO "Locations" VALUES (1,1,'House','A warm and welcoming home, where every corner holds cherished memories. The soft glow of the fireplace, the creak of wooden floors, and the comforting aroma of home-cooked meals create an atmosphere of peace and belonging. It’s a sanctuary from the outside world, offering a safe space for laughter, rest, and heartfelt conversations with loved ones.');
INSERT INTO "Locations" VALUES (2,2,'Street','A lively and ever-changing scene where life unfolds in real-time. Streets are the veins of a city, connecting people, ideas, and cultures. They echo with the sounds of footsteps, distant conversations, and the occasional hum of passing vehicles. Whether it’s a quiet residential lane or a bustling urban avenue, each street tells a story of the people who walk it.');
INSERT INTO "Locations" VALUES (3,3,'Garden','A tranquil haven teeming with life, from the vibrant colors of blooming flowers to the gentle rustling of leaves in the breeze. It’s a place where time slows down, and the mind can wander freely among fragrant herbs, flourishing plants, and buzzing pollinators. A garden offers solace and inspiration, inviting you to reconnect with nature and its simple, profound beauty.');
INSERT INTO "Locations" VALUES (4,4,'Space','The boundless and awe-inspiring expanse that stretches beyond human comprehension. Space is a silent, mysterious frontier filled with dazzling stars, enigmatic planets, and the quiet hum of distant galaxies. It stirs a sense of wonder and curiosity, urging us to explore its vastness and uncover its secrets, one small step at a time.');
INSERT INTO "Locations" VALUES (5,5,'Black hole','A mesmerizing and terrifying force of nature, a black hole devours everything that dares to come too close. Its immense gravitational pull distorts time and space, creating a region from which not even light can escape. It stands as a cosmic enigma, challenging the limits of human understanding and beckoning us to unravel the mysteries hidden within its event horizon.');
INSERT INTO "Locations" VALUES (6,11,'Coop Shop','A charming and friendly community store where shelves brim with fresh produce, handmade goods, and everyday essentials. The Coop Shop is more than just a place to shop—it’s a gathering point for the neighborhood, where familiar faces exchange smiles, recipes, and news of the day. Its welcoming atmosphere reminds everyone of the value of supporting local and staying connected.');
INSERT INTO "Locations" VALUES (7,14,'Work','A place where ambition meets opportunity, and every challenge presents a chance for growth. Work is a dynamic environment where ideas are born, skills are honed, and goals are pursued with determination. It’s where individuals come together, combining their talents to create, innovate, and make meaningful contributions to a shared purpose.');
INSERT INTO "Locations" VALUES (8,18,'Wealthy street','dsf');
INSERT INTO "Locations" VALUES (9,19,'Bank','banj');
INSERT INTO "Locations" VALUES (10,20,'Bank interior','df');
INSERT INTO "Locations" VALUES (11,21,'Casino','casas');
INSERT INTO "Locations" VALUES (12,22,'Gamble','90%');
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
INSERT INTO "__EFMigrationsHistory" VALUES ('20250114233223_Bobullete','9.0.0');
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
