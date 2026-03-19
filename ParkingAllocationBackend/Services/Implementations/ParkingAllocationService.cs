
using Microsoft.EntityFrameworkCore;
using ParkingAllocationBackend.Data;
using ParkingAllocationBackend.DTO;
using ParkingAllocationBackend.Models;
using ParkingAllocationBackend.Services.Interfaces;


namespace ParkingAllocationBackend.Services.Implementation
{
    public class ParkingAllocationService : IParkingAllocationService
    {
        private readonly ApplicationDbContext _context;

        public ParkingAllocationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ParkingAllocationDto>> GetAllAllocationsAsync()
        {
            return await _context.parkingAllocations
                .Select(a => new ParkingAllocationDto
                {
                    AllocationId = a.AllocationId,
                    ParkingSpaceId = a.ParkingSpaceId,
                    UserId = a.UserId,
                    VehicleId = a.VehicleId,
                    FromDate = a.FromDate,
                    ToDate = a.ToDate,
                    IsActive = a.IsActive
                }).ToListAsync();
        }

        public async Task<ParkingAllocationDto?> GetAllocationByIdAsync(int id)
        {
            var a = await _context.parkingAllocations.FindAsync(id);
            if (a == null) return null;
            return new ParkingAllocationDto
            {
                AllocationId = a.AllocationId,
                ParkingSpaceId = a.ParkingSpaceId,
                UserId = a.UserId,
                VehicleId = a.VehicleId ,
                FromDate = a.FromDate,
                ToDate = a.ToDate,
                IsActive = a.IsActive
            };
        }


        public async Task<ParkingAllocationDto> CreateAllocationAsync(CreateParkingAllocationDto dto)
        {
          
            var vehicle = await _context.Vehicles
                .FirstOrDefaultAsync(v => v.VehicleId == dto.VehicleId && v.UserId == dto.UserId);

            if (vehicle == null)
                throw new InvalidOperationException("Invalid UserId or VehicleId. You can only allocate your own registered vehicles.");

          
            bool isVehicleAllocated = await _context.parkingAllocations
                .AnyAsync(a => a.VehicleId == dto.VehicleId && a.IsActive);

            if (isVehicleAllocated)
                throw new InvalidOperationException("This vehicle is already allocated to a parking space.");
            var space = await _context.ParkingSpaces.FindAsync(dto.ParkingSpaceId);
            if (space == null)
                throw new InvalidOperationException("Selected parking space does not exist.");

            if (!space.IsAvaiable)
                throw new InvalidOperationException("Selected parking space is already allocated to another vehicle.");
            var allocation = new ParkingAllocation
            {
                ParkingSpaceId = dto.ParkingSpaceId,
                UserId = dto.UserId, 
                VehicleId = dto.VehicleId,
                FromDate = dto.FromDate,
                ToDate = dto.ToDate,
                IsActive = true
            };
            space.IsAvaiable = false;

            _context.parkingAllocations.Add(allocation);
            await _context.SaveChangesAsync();

            return new ParkingAllocationDto
            {
                AllocationId = allocation.AllocationId,
                ParkingSpaceId = allocation.ParkingSpaceId,
                UserId = allocation.UserId,
                VehicleId = allocation.VehicleId,
                FromDate = allocation.FromDate,
                ToDate = allocation.ToDate,
                IsActive = allocation.IsActive
            };
        }




        public async Task UpdateExpiredAllocationsAsync()
        {
            var expiredAllocations = await _context.parkingAllocations
                .Where(a => a.ToDate < DateTime.UtcNow && a.IsActive)
                .ToListAsync();

            foreach (var allocation in expiredAllocations)
            {
                allocation.IsActive = false;
                var space = await _context.ParkingSpaces.FindAsync(allocation.ParkingSpaceId);
                if (space != null)
                {
                    space.IsAvaiable = true;
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
