using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Services;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreateDto userdto)
        {
            var user=await _userService.RegisterAsync(userdto);
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto loginDto)
        {
            var token = await _userService.AuthenticateAsync(loginDto);
            if (token == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(new { Token = token});
        }
        [Authorize(Roles ="Admin")]
        [HttpGet("admin-only")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("update-admin-only/{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] UserUpdateDto updateDto)
        {
            var updatedUser =await _userService.UpdateUserAsync(id, updateDto);
            return Ok(updatedUser);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-admin-only/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            try
            {
                var success = await _userService.DeleteUserAsync(id);

                if (!success)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new { message = "Delete Successful" });
            }
            catch (InvalidOperationException ex)
            {
                // Business rule violation (e.g., user has loyalty account)
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                // Unexpected error
                return StatusCode(500, new { message = "An unexpected error occurred while deleting the user." });
            }
        }

        [HttpGet("managers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetManagers()
        {
            var managers = await _userService.GetManagersAsync();
            return Ok(managers);
        }
    }
}
