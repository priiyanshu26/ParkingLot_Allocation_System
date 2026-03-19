namespace ParkingAllocationBackend.DTO
{
    public class CreateParkingAllocationDto
    {
        public int UserId { get; set; }
        public int VehicleId { get; set; }
        public int ParkingSpaceId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
