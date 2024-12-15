using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    /// <inheritdoc />
    public partial class ListConnections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Image = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationID);
                });

            migrationBuilder.CreateTable(
                name: "LocationConnections",
                columns: table => new
                {
                    LocationID = table.Column<int>(type: "INTEGER", nullable: false),
                    ConnectedLocationID = table.Column<int>(type: "INTEGER", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_LocationConnections_ConnectedLocationID",
                table: "LocationConnections",
                column: "ConnectedLocationID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LocationConnections");

            migrationBuilder.DropTable(
                name: "Locations");
        }
    }
}
