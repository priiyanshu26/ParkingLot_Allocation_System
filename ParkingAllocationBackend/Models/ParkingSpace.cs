using System.ComponentModel.DataAnnotations;

namespace ParkingAllocationBackend.Models
{
    public class ParkingSpace
    {
        [Key]
        public int ParkingSpaceId { get; set; }
        public bool IsAvaiable { get; set; } = true;
    }
}
