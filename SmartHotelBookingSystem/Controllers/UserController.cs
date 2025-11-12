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
            var success= await _userService.DeleteUserAsync(id);
            if(!success)
            {
                return NotFound("User not found");
            }
            return Ok("Delete Successful");
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
