using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Services.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}
