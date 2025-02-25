using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GamebookCihullick.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedCutsceneTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cutscenes",
                columns: table => new
                {
                    CutsceneID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageID = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Text = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cutscenes", x => x.CutsceneID);
                    table.ForeignKey(
                        name: "FK_Cutscenes_Images_ImageID",
                        column: x => x.ImageID,
                        principalTable: "Images",
                        principalColumn: "ImageID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cutscenes_ImageID",
                table: "Cutscenes",
                column: "ImageID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cutscenes");
        }
    }
}
