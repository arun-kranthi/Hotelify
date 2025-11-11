using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Services;
using System.Threading.Tasks;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoyaltyController : ControllerBase
    {
        private readonly IloyaltyServices _service;

        public LoyaltyController(IloyaltyServices service)
        {
            _service = service;
        }

        [HttpGet("{userId}/points")]
        public async Task<IActionResult> GetPoints(int userId)
        {
            var account = await _service.GetAccountAsync(userId);
            if (account == null)
            {
                return NotFound("Loyalty account not found.");
            }
            return Ok(account);
        }

        [HttpPost("{userId}/booking/{bookingId}")]
        public async Task<IActionResult> AddPoints(int userId, int bookingId)
        {
            await _service.AddPointsForBookingAsync(userId, bookingId);
            return Ok("Points added for booking.");
        }

        [HttpPost("{userId}/redeem/{bookingId}")]
        public async Task<IActionResult> RedeemPoints(int userId, int bookingId, [FromBody] RedemptionRequestDto dto)
        {
            var result = await _service.RedeemAsync(userId, bookingId, dto.PointsUsed);
            return Ok(result);
        }
    }
}
