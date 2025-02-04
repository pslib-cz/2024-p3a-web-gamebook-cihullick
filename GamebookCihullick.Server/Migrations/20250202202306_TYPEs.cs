using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    /// <inheritdoc />
    public partial class TYPEs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "NPCs",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "ShowsInInventory",
                table: "Items",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Items",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "NPCs");

            migrationBuilder.DropColumn(
                name: "ShowsInInventory",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Items");
        }
    }
}
