using SmartHotelBookingSystem.DTO;

namespace SmartHotelBookingSystem.Services
{
    public interface IUserService
    {
        Task<string> AuthenticateAsync(UserLoginDto loginDto);
        Task<UserResponseDto> RegisterAsync(UserCreateDto createDto);
        Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();
    }
}
