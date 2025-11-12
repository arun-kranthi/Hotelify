using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.Services; // Or wherever IUserService is
using SmartHotelBookingSystem.DTO; // Or wherever your DTOs are
using System.Security.Claims;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // 1. Secure the whole controller
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;

        public ProfileController(IUserService userService)
        {
            _userService = userService;
        }

        // 2. --- ADD THIS ---
        // GET: /api/profile
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdString);

            // You'll need to create GetUserByIdAsync in your service
            // It should return a UserResponseDto
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null) return NotFound();

            return Ok(user);
        }

        // 3. --- ADD THIS ---
        // PUT: /api/profile
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UserUpdateDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userIdString);

            try
            {
                var updatedUser = await _userService.UpdateUserAsync(userId, dto);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
