using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedCutsceneTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NextCutsceneID",
                table: "Cutscenes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextCutsceneID",
                table: "Cutscenes");
        }
    }
}
