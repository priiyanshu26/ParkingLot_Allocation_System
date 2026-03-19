
using Microsoft.EntityFrameworkCore;
using ParkingAllocationBackend.Data;
using ParkingAllocationBackend.DTO;
using ParkingAllocationBackend.Models;
using ParkingAllocationBackend.Services.Interfaces;

namespace ParkingAllocationBackend.Services.Implementations
{

    public class VehicleService : IVehicleService
    {
        private readonly ApplicationDbContext _context;

        public VehicleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GetAllVehicleDto> CreateVehicleAsync(CreateVehicleDto dto, int userId)
        {
            var vehicle = new Vehicle
            {
                NumberPlate = dto.NumberPlate,
                type = dto.Type,
                Model = dto.Model,
                color = dto.Color,
                UserId = userId
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return await GetVehicleByIdAsync(vehicle.VehicleId);
        }

        public async Task<IEnumerable<GetAllVehicleDto>> GetAllVehiclesAsync(int? userId = null)
        {
            var query = _context.Vehicles.AsQueryable();

            if (userId.HasValue)
                query = query.Where(v => v.UserId == userId);

            return await query.Select(v => new GetAllVehicleDto
            {
                VehicleId = v.VehicleId,
                NumberPlate = v.NumberPlate,
                Type = v.type,
                Model = v.Model,
                Color = v.color,
                UserId = v.UserId
            }).ToListAsync();
        }

        public async Task<GetAllVehicleDto> GetVehicleByIdAsync(int id)
        {
            var v = await _context.Vehicles.FindAsync(id);
            if (v == null) return null;

            return new GetAllVehicleDto
            {
                VehicleId = v.VehicleId,
                NumberPlate = v.NumberPlate,
                Type = v.type,
                Model = v.Model,
                Color = v.color,
                UserId = v.UserId
            };
        }

        public async Task<bool> UpdateVehicleAsync(int id, CreateVehicleDto dto)
        {
            var v = await _context.Vehicles.FindAsync(id);
            if (v == null) return false;

            v.NumberPlate = dto.NumberPlate;
            v.type = dto.Type;
            v.Model = dto.Model;
            v.color = dto.Color;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteVehicleAsync(int id)
        {
            var v = await _context.Vehicles.FindAsync(id);
            if (v == null) return false;

            _context.Vehicles.Remove(v);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
