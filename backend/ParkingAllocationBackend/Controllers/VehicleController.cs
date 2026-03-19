using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingAllocationBackend.DTO;
using ParkingAllocationBackend.Services.Interfaces;
using System.Security.Claims;

namespace ParkingAllocationBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VehicleController:ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetVehicles()
        {
            var vehicles = await _vehicleService.GetAllVehiclesAsync();
            return Ok(vehicles);
        }


        [HttpPost]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateVehicleDto dto)
        {

            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);


            if (idClaim == null || !int.TryParse(idClaim.Value, out int userId))
            {
                return Unauthorized("User ID claim is missing or invalid in token.");
            }


            var vehicle = await _vehicleService.CreateVehicleAsync(dto, userId);
            return Ok(vehicle);
        }



        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> GetVehicleById(int id)
        {
            var vehicle = await _vehicleService.GetVehicleByIdAsync(id);
            if (vehicle == null)
                return NotFound();
            return Ok(vehicle);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] CreateVehicleDto dto)
        {
            var updated = await _vehicleService.UpdateVehicleAsync(id, dto);
            if (!updated)
                return NotFound();
            return Ok("update successfull");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var deleted = await _vehicleService.DeleteVehicleAsync(id);
            if (!deleted)
                return NotFound();
            return Ok("deleted successfull");
        }
    }
}
