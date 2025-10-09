using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Services;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoyaltyController:ControllerBase
    {
        private readonly IloyaltyServices _service;
        private readonly IMapper _mapper;
        public LoyaltyController(IloyaltyServices service,IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
        [HttpGet("{userId}/points")]
        public IActionResult GetPoints(int userId)
        {
            var account = _service.GetAccount(userId);
            if (account == null)
            {
                return NotFound("Loyalty account not found.");
            }
            var dto = _mapper.Map<LoyaltyAccountDto>(account);
            return Ok(dto);
        }
        [HttpPost("{userId}/booking/{bookingId}")]
        public IActionResult AddPoints(int userId, int bookingId)
        {
            _service.AddPointsForBooking(userId, bookingId);
            return Ok("Points added for booking.");
        }
        [HttpPost("{userId}/redeem/{bookingId}")]
        public IActionResult RedeemPoints(int userId, int bookingId, [FromBody] RedemptionDto dto)
        {
            _service.Redeem(userId, bookingId, dto.PointsUsed);
            return Ok("Points redeemed successfully.");
        }
    }
}
