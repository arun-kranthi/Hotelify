using System.Threading.Tasks;
using SmartHotelBookingSystem.DTO;

namespace SmartHotelBookingSystem.Services
{
    public interface IUserService
    {
        Task<string> AuthenticateAsync(UserLoginDto loginDto);
        Task<UserResponseDto> RegisterAsync(UserCreateDto createDto);
        Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();
        Task<bool> DeleteUserAsync(int id);
        Task<UserResponseDto> UpdateUserAsync(int id, UserUpdateDto updateDto);
        //service method used in profile controller
        Task<UserResponseDto> GetUserByIdAsync(int id);
        Task<IEnumerable<UserResponseDto>> GetManagersAsync();
    }
}
