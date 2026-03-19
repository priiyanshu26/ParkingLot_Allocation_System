using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingAllocationBackend.Migrations
{
    /// <inheritdoc />
    public partial class MakeVehicleIdNullableAndSetNullOnDeleteV3 : Migration
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
                principalColumn: "VehicleId");
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
                principalColumn: "VehicleId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
