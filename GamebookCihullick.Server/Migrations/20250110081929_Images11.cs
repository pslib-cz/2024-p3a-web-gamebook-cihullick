using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    /// <inheritdoc />
    public partial class Images11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    ImageID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    PathToFile = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.ImageID);
                });

            migrationBuilder.CreateTable(
                name: "Achievement",
                columns: table => new
                {
                    AchievementID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageID = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Achievement", x => x.AchievementID);
                    table.ForeignKey(
                        name: "FK_Achievement_Images_ImageID",
                        column: x => x.ImageID,
                        principalTable: "Images",
                        principalColumn: "ImageID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageID = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Cost = table.Column<int>(type: "INTEGER", nullable: false),
                    IsEdible = table.Column<bool>(type: "INTEGER", nullable: true),
                    NutritionalValue = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemID);
                    table.ForeignKey(
                        name: "FK_Items_Images_ImageID",
                        column: x => x.ImageID,
                        principalTable: "Images",
                        principalColumn: "ImageID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageID = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationID);
                    table.ForeignKey(
                        name: "FK_Locations_Images_ImageID",
                        column: x => x.ImageID,
                        principalTable: "Images",
                        principalColumn: "ImageID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LocationConnections",
                columns: table => new
                {
                    LocationID = table.Column<int>(type: "INTEGER", nullable: false),
                    ConnectedLocationID = table.Column<int>(type: "INTEGER", nullable: false),
                    LocationConnectionID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationConnections", x => new { x.LocationID, x.ConnectedLocationID });
                    table.ForeignKey(
                        name: "FK_LocationConnections_Locations_ConnectedLocationID",
                        column: x => x.ConnectedLocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LocationConnections_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NPCs",
                columns: table => new
                {
                    NPCID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageID = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    LocationID = table.Column<int>(type: "INTEGER", nullable: false),
                    LocationConnectionID = table.Column<int>(type: "INTEGER", nullable: false),
                    LocationConnectionLocationID = table.Column<int>(type: "INTEGER", nullable: false),
                    LocationConnectionConnectedLocationID = table.Column<int>(type: "INTEGER", nullable: false),
                    RequiredItemID = table.Column<int>(type: "INTEGER", nullable: false),
                    Dialog = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NPCs", x => x.NPCID);
                    table.ForeignKey(
                        name: "FK_NPCs_Images_ImageID",
                        column: x => x.ImageID,
                        principalTable: "Images",
                        principalColumn: "ImageID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NPCs_Items_RequiredItemID",
                        column: x => x.RequiredItemID,
                        principalTable: "Items",
                        principalColumn: "ItemID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NPCs_LocationConnections_LocationConnectionLocationID_LocationConnectionConnectedLocationID",
                        columns: x => new { x.LocationConnectionLocationID, x.LocationConnectionConnectedLocationID },
                        principalTable: "LocationConnections",
                        principalColumns: new[] { "LocationID", "ConnectedLocationID" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NPCs_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Achievement_ImageID",
                table: "Achievement",
                column: "ImageID");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ImageID",
                table: "Items",
                column: "ImageID");

            migrationBuilder.CreateIndex(
                name: "IX_LocationConnections_ConnectedLocationID",
                table: "LocationConnections",
                column: "ConnectedLocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ImageID",
                table: "Locations",
                column: "ImageID");

            migrationBuilder.CreateIndex(
                name: "IX_NPCs_ImageID",
                table: "NPCs",
                column: "ImageID");

            migrationBuilder.CreateIndex(
                name: "IX_NPCs_LocationConnectionLocationID_LocationConnectionConnectedLocationID",
                table: "NPCs",
                columns: new[] { "LocationConnectionLocationID", "LocationConnectionConnectedLocationID" });

            migrationBuilder.CreateIndex(
                name: "IX_NPCs_LocationID",
                table: "NPCs",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_NPCs_RequiredItemID",
                table: "NPCs",
                column: "RequiredItemID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Achievement");

            migrationBuilder.DropTable(
                name: "NPCs");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "LocationConnections");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Images");
        }
    }
}
