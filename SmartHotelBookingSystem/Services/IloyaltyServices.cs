using SmartHotelBookingSystem.DTO;
using System.Threading.Tasks;

namespace SmartHotelBookingSystem.Services
{
    public interface IloyaltyServices
    {
        Task<LoyaltyAccountDto> GetAccountAsync(int userId);
        Task AddPointsForBookingAsync(int userId, int bookingId);
        Task<RedemptionResponseDto> RedeemAsync(int userId, int bookingId, int pointsUsed);
        Task<decimal> RedeemPointsForBooking(int userId, int pointsToRedeem);
    }
}

