using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver203 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "Socials",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "PeopleSocials",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "Peoples",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "Careers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "CareerPeoples",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Enabled",
                table: "CareerPeoples",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "CareerPeoples",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "Socials");

            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "PeopleSocials");

            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "Peoples");

            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "Careers");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "CareerPeoples");

            migrationBuilder.DropColumn(
                name: "Enabled",
                table: "CareerPeoples");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "CareerPeoples");
        }
    }
}
