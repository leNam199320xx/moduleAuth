using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver202 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "Socials",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "PeopleSocials",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "Peoples",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Careers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "CareerPeoples",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "Socials");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "PeopleSocials");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "Peoples");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "CareerPeoples");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Careers",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
