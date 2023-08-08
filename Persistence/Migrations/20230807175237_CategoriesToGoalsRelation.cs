using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CategoriesToGoalsRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GoalId",
                table: "Categories",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_GoalId",
                table: "Categories",
                column: "GoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Goals_GoalId",
                table: "Categories",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Goals_GoalId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_GoalId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "GoalId",
                table: "Categories");
        }
    }
}
