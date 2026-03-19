using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingAllocationBackend.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_parkingAllocations_Vehicles_VehicleId",
                table: "parkingAllocations");

            migrationBuilder.AddForeignKey(
                name: "FK_parkingAllocations_Vehicles_VehicleId",
                table: "parkingAllocations",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "VehicleId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_parkingAllocations_Vehicles_VehicleId",
                table: "parkingAllocations");

            migrationBuilder.AddForeignKey(
                name: "FK_parkingAllocations_Vehicles_VehicleId",
                table: "parkingAllocations",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "VehicleId");
        }
    }
}
