
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingAllocationBackend.Data;
using ParkingAllocationBackend.DTO;
using ParkingAllocationBackend.Models; 
using ParkingAllocationBackend.Services.Interfaces;
using System.Security.Claims;

namespace ParkingAllocationBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ParkingAllocationController : ControllerBase
    {
        private readonly IParkingAllocationService _service;
        private readonly ApplicationDbContext _context; 

        public ParkingAllocationController(IParkingAllocationService service, ApplicationDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAllocationsAsync());
        }




        [HttpGet("{id}")]
        [Authorize(Roles = "User,Admin")] 
        public async Task<IActionResult> GetAllocationById(int id)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var allocation = await _context.parkingAllocations
                .FirstOrDefaultAsync(a => a.AllocationId == id);

            if (allocation == null)
                return NotFound(new { message = "Allocation not found" });

        
            var isAdmin = User.IsInRole("Admin");
            if (!isAdmin && allocation.UserId.ToString() != userIdFromToken)
                return Forbid(); 

            return Ok(allocation);
        }


        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Create(CreateParkingAllocationDto dto)
        {
            var userIdFromToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdFromToken))
                return Unauthorized(new { message = "User ID not found in token" });

           
            dto.UserId = int.Parse(userIdFromToken);

            try
            {
                var result = await _service.CreateAllocationAsync(dto);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message); 
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message }); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


    }
}
