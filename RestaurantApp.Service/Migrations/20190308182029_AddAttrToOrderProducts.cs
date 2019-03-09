using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Service.Migrations
{
    public partial class AddAttrToOrderProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsServed",
                table: "OrderProducts",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsServed",
                table: "OrderProducts");
        }
    }
}
