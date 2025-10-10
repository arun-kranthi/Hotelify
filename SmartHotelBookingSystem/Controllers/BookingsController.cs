using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO.module_3;
using SmartHotelBookingSystem.Services;

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
            var result = await _bookingService.CreateBookingAsync(dto);
            return Ok(result);
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
    }
}
