using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO.module_2;
using SmartHotelBookingSystem.Services.Module2_services;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelService _hotelService;
        public HotelsController(IHotelService hotelService) => _hotelService = hotelService;

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await _hotelService.GetAllAsync();
            return Ok(hotels);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int id)
        {
            var hotel = await _hotelService.GetByIdAsync(id);
            if (hotel == null) return NotFound();
            return Ok(hotel);
        }

        // Only admin or hotel manager can create hotels
        [HttpPost]
        [Authorize(Roles = "Admin, HotelManager")]
        public async Task<IActionResult> Create(HotelCreateDto dto)
        {
            var created = await _hotelService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.HotelID }, created);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin, HotelManager")]
        public async Task<IActionResult> Update(int id, HotelUpdateDto dto)
        {
            await _hotelService.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _hotelService.DeleteAsync(id);

                if (!success)
                    return NotFound(new { message = "Hotel not found." });

                return Ok(new { message = "Hotel deleted successfully." });
            }
            catch (InvalidOperationException ex)
            {
                // Business rule violation: hotel has active bookings
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An unexpected error occurred while deleting the hotel." });
            }
        }

        [HttpGet("manager/{managerId}")]
        [Authorize(Roles = "HotelManager")]
        public async Task<IActionResult> GetHotelsByManager(string managerId)
        {
            if (string.IsNullOrEmpty(managerId))
            {
                return BadRequest("Manager ID must be provided.");
            }

            var hotels = await _hotelService.GetHotelsByManagerAsync(managerId);

            if (hotels == null || !hotels.Any())
            {
                return NotFound("No hotels found for this manager.");
            }

            return Ok(hotels);
        }


    }
}