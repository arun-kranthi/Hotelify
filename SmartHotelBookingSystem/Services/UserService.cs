using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Enums;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;
using SmartHotelBookingSystem.Services.Authentication;

namespace SmartHotelBookingSystem.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IJwtTokenGenerator _tokenGen;
        public UserService(IUserRepository repo, IJwtTokenGenerator tokenGen)
        {
            _repo = repo;
            _tokenGen = tokenGen;
        }

        public async Task<string> AuthenticateAsync(UserLoginDto loginDto)
        {
            var user = await _repo.GetUserByEmailAsync(loginDto.Email);
            if (user == null || user.Password != loginDto.Password)
            {
                return null;
            }
            return _tokenGen.GenerateToken(user);
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users=await _repo.GetAllUsersAsync();
            return users.Select(u =>
            new UserResponseDto
            {
                UserID = u.UserID,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role.ToString(),
                ContactNumber = u.ContactNumber,
            });
        }

        public async Task<UserResponseDto> RegisterAsync(UserCreateDto createDto)
        {
            var user = new User
            {
                Name=createDto.Name,
                Email=createDto.Email,
                Password=createDto.Password,
                Role = Enum.Parse<UserRole>(createDto.Role,ignoreCase:true),
                ContactNumber=createDto.ContactNumber,
            };
            await _repo.AddUserAsync(user);
            return new UserResponseDto
            {
                UserID=user.UserID,
                Name=user.Name,
                Email=user.Email,
                Role=user.Role.ToString(),
                ContactNumber=user.ContactNumber,
            };
        }
    }
}
