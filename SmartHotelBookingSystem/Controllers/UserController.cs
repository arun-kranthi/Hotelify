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
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

    }
}
