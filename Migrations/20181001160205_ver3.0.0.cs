using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver300 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Adwards",
                columns: table => new
                {
                    Index = table.Column<int>(nullable: false),
                    Enabled = table.Column<bool>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdwardName = table.Column<string>(nullable: true),
                    Tags = table.Column<string>(nullable: true),
                    Message = table.Column<string>(nullable: true),
                    IconUrl = table.Column<string>(nullable: true),
                    BackgroundUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adwards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PeopleAdwards",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdwardId = table.Column<int>(nullable: false),
                    PeopleId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: true),
                    DetailTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleAdwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeopleAdwards_Adwards_AdwardId",
                        column: x => x.AdwardId,
                        principalTable: "Adwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PeopleAdwards_Peoples_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "Peoples",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PeopleAdwards_AdwardId",
                table: "PeopleAdwards",
                column: "AdwardId");

            migrationBuilder.CreateIndex(
                name: "IX_PeopleAdwards_PeopleId",
                table: "PeopleAdwards",
                column: "PeopleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PeopleAdwards");

            migrationBuilder.DropTable(
                name: "Adwards");
        }
    }
}
