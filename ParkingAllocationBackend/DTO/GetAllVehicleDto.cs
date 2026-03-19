namespace ParkingAllocationBackend.DTO
{
    public class GetAllVehicleDto
    {
        public int VehicleId { get; set; }
        public string NumberPlate { get; set; }
        public string Type { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }

        public int UserId { get; set; }
    }
}
