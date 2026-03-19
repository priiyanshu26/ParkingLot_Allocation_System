using Microsoft.EntityFrameworkCore;
using ParkingAllocationBackend.Data;
using ParkingAllocationBackend.DTO;
using ParkingAllocationBackend.Services.Interfaces;

namespace ParkingAllocationBackend.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }




        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return await _context.users.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.UserName,
                Role = u.Role
            }).ToListAsync();
        }




        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Role = user.Role
            };
        }





        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null) return false;

            _context.users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
