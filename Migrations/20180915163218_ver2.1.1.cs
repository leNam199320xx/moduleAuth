using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver211 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Follow",
                table: "PeopleSocialsByDate",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Like",
                table: "PeopleSocialsByDate",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Share",
                table: "PeopleSocialsByDate",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "View",
                table: "PeopleSocialsByDate",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Follow",
                table: "PeopleSocialsByDate");

            migrationBuilder.DropColumn(
                name: "Like",
                table: "PeopleSocialsByDate");

            migrationBuilder.DropColumn(
                name: "Share",
                table: "PeopleSocialsByDate");

            migrationBuilder.DropColumn(
                name: "View",
                table: "PeopleSocialsByDate");
        }
    }
}
