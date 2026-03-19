using ParkingAllocationBackend.DTO;
using ParkingAllocationBackend.Models;

namespace ParkingAllocationBackend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDto registerDto);
        Task<string> LoginAsync(LoginDto loginDto);
        Task<User> GetUserByUsernameAsync(string username);
    }
}

