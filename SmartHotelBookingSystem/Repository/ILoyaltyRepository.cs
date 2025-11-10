using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public interface ILoyaltyRepository
    {
        LoyaltyAccount GetByUserId(int userId);
        void AddPoints(int userId, int points);
        void RedeemPoints(int userId, int bookingId, int points, decimal discount);

        void Update(LoyaltyAccount account);

    }
}
