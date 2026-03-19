namespace ParkingAllocationBackend.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public string type {  get; set; }
        public string NumberPlate { get; set; }
        public string Model {  get; set; }
        public string color { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
