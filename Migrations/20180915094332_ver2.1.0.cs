using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class ver210 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PeopleSocialsByDate",
                columns: table => new
                {
                    Index = table.Column<int>(nullable: false),
                    Enabled = table.Column<bool>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PeopleSocialsId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleSocialsByDate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeopleSocialsByDate_PeopleSocials_PeopleSocialsId",
                        column: x => x.PeopleSocialsId,
                        principalTable: "PeopleSocials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PeopleSocialsByDate_PeopleSocialsId",
                table: "PeopleSocialsByDate",
                column: "PeopleSocialsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PeopleSocialsByDate");
        }
    }
}
