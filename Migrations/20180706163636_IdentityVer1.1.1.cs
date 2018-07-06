using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular6DotnetCore.Migrations
{
    public partial class IdentityVer111 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProviderId",
                table: "Post",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Provider",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProviderCode = table.Column<string>(nullable: true),
                    ProviderName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Activated = table.Column<bool>(nullable: true),
                    ActivatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provider", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Post_ProviderId",
                table: "Post",
                column: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Provider_ProviderId",
                table: "Post",
                column: "ProviderId",
                principalTable: "Provider",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Provider_ProviderId",
                table: "Post");

            migrationBuilder.DropTable(
                name: "Provider");

            migrationBuilder.DropIndex(
                name: "IX_Post_ProviderId",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "ProviderId",
                table: "Post");
        }
    }
}
