using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO.module_2.RoomDto;
using SmartHotelBookingSystem.Services.Module2_services;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomsController(IRoomService roomService) => _roomService = roomService;

        [HttpGet]
       
        public async Task<IActionResult> GetAll()
        {
            var rooms = await _roomService.GetAllAsync();
            return Ok(rooms);
        }

        [HttpGet("{id:int}")]
        
        public async Task<IActionResult> Get(int id)
        {
            var room = await _roomService.GetByIdAsync(id);
            if (room == null) return NotFound();
            return Ok(room);
        }

        [HttpGet("search")]
        
        public async Task<IActionResult> Search(
            [FromQuery] int? hotelId,
            [FromQuery] string? type,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] bool? availability)
        {
            var rooms = await _roomService.SearchAsync(hotelId, type, minPrice, maxPrice, availability);
            return Ok(rooms);
        }

        [HttpPost]
        
        public async Task<IActionResult> Create(RoomCreateDto dto)
        {
            var created = await _roomService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.RoomID }, created);
        }

        [HttpPut("{id:int}")]
        
        public async Task<IActionResult> Update(int id, RoomUpdateDto dto)
        {
            await _roomService.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
       
        public async Task<IActionResult> Delete(int id)
        {
            await _roomService.DeleteAsync(id);
            return NoContent();
        }
    }
}