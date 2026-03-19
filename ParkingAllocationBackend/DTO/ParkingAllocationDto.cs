namespace ParkingAllocationBackend.DTO
{
    public class ParkingAllocationDto
    {

        public int AllocationId { get; set; }
        public int ParkingSpaceId { get; set; }
        public int UserId { get; set; }
        public int VehicleId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
    }
}
