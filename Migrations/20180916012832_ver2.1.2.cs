using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver212 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeopleSocialsByDate_PeopleSocials_PeopleSocialsId",
                table: "PeopleSocialsByDate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PeopleSocialsByDate",
                table: "PeopleSocialsByDate");

            migrationBuilder.RenameTable(
                name: "PeopleSocialsByDate",
                newName: "PeopleSocialsByDates");

            migrationBuilder.RenameIndex(
                name: "IX_PeopleSocialsByDate_PeopleSocialsId",
                table: "PeopleSocialsByDates",
                newName: "IX_PeopleSocialsByDates_PeopleSocialsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PeopleSocialsByDates",
                table: "PeopleSocialsByDates",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PeopleSocialsByDates_PeopleSocials_PeopleSocialsId",
                table: "PeopleSocialsByDates",
                column: "PeopleSocialsId",
                principalTable: "PeopleSocials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeopleSocialsByDates_PeopleSocials_PeopleSocialsId",
                table: "PeopleSocialsByDates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PeopleSocialsByDates",
                table: "PeopleSocialsByDates");

            migrationBuilder.RenameTable(
                name: "PeopleSocialsByDates",
                newName: "PeopleSocialsByDate");

            migrationBuilder.RenameIndex(
                name: "IX_PeopleSocialsByDates_PeopleSocialsId",
                table: "PeopleSocialsByDate",
                newName: "IX_PeopleSocialsByDate_PeopleSocialsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PeopleSocialsByDate",
                table: "PeopleSocialsByDate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PeopleSocialsByDate_PeopleSocials_PeopleSocialsId",
                table: "PeopleSocialsByDate",
                column: "PeopleSocialsId",
                principalTable: "PeopleSocials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
