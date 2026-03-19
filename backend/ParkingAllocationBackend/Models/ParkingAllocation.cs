using System.ComponentModel.DataAnnotations;

namespace ParkingAllocationBackend.Models
{
    public class ParkingAllocation
    {
        [Key]
        public int AllocationId { get; set; }
        public int ParkingSpaceId { get; set; }
        public ParkingSpace ParkingSpace { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }=true;

    }
}
