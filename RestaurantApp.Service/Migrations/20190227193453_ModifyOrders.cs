using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantApp.Service.Migrations
{
    public partial class ModifyOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderName",
                table: "Orders",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 35);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "OrderName",
                table: "Orders",
                maxLength: 35,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 50);
        }
    }
}
