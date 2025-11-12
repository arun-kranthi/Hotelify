using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO.module_3;
using SmartHotelBookingSystem.Services;
using System.Security.Claims;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
        {
            try
            {
                var result = await _bookingService.CreateBookingAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _bookingService.GetBookingAsync(id);
            return Ok(result);
        }
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            await _bookingService.CancelBookingAsync(id);
            return NoContent();
        }

        [HttpGet("mybookings")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdString);

            var result = await _bookingService.GetBookingsByUserIdAsync(userId);
            return Ok(result);
        }
        [HttpGet("all/{managerId}")]
        public async Task<IActionResult> GetAllBookings(string managerId)
        {
            var result = await _bookingService.GetBookingsForManagerAsync(managerId);
            return Ok(result);
        }

    }
}
