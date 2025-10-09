using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Services
{
    public interface IloyaltyServices
    {
        LoyaltyAccount GetAccount(int userId);
        void AddPointsForBooking(int userId, int bookingId);
        void Redeem(int userId, int bookingId, int points);
    }
}
