using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver204 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CareerPeoples");

            migrationBuilder.AddColumn<int>(
                name: "CareerId",
                table: "Peoples",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Peoples_CareerId",
                table: "Peoples",
                column: "CareerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Peoples_Careers_CareerId",
                table: "Peoples",
                column: "CareerId",
                principalTable: "Careers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Peoples_Careers_CareerId",
                table: "Peoples");

            migrationBuilder.DropIndex(
                name: "IX_Peoples_CareerId",
                table: "Peoples");

            migrationBuilder.DropColumn(
                name: "CareerId",
                table: "Peoples");

            migrationBuilder.CreateTable(
                name: "CareerPeoples",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CareerId = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    Enabled = table.Column<bool>(nullable: true),
                    Index = table.Column<int>(nullable: false),
                    PeopleId = table.Column<int>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerPeoples", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CareerPeoples_Careers_CareerId",
                        column: x => x.CareerId,
                        principalTable: "Careers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CareerPeoples_Peoples_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "Peoples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CareerPeoples_CareerId",
                table: "CareerPeoples",
                column: "CareerId");

            migrationBuilder.CreateIndex(
                name: "IX_CareerPeoples_PeopleId",
                table: "CareerPeoples",
                column: "PeopleId");
        }
    }
}
