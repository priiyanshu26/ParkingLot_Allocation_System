using ParkingAllocationBackend.Models;

namespace ParkingAllocationBackend.Auth
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}
