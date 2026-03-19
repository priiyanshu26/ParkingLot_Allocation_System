

using ParkingAllocationBackend.DTO;

namespace ParkingAllocationBackend.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<IEnumerable<GetAllVehicleDto>> GetAllVehiclesAsync(int? userId = null);
        Task<GetAllVehicleDto> GetVehicleByIdAsync(int id);
        Task<GetAllVehicleDto> CreateVehicleAsync(CreateVehicleDto vehicleDto, int userId);
        Task<bool> UpdateVehicleAsync(int id, CreateVehicleDto vehicleDto);
        Task<bool> DeleteVehicleAsync(int id);
    }
}
