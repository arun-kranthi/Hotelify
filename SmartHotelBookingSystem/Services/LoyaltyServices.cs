using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;

namespace SmartHotelBookingSystem.Services
{
    public class LoyaltyServices : IloyaltyServices
    {
        private readonly ILoyaltyRepository _repo;
        public LoyaltyServices(ILoyaltyRepository repo)
        {
            _repo = repo;
        }

        public void AddPointsForBooking(int userId, int bookingId)
        {
            _repo.AddPoints(userId,10);
        }

        public LoyaltyAccount GetAccount(int userId)
        {
            return _repo.GetByUserId(userId);
        }

        public void Redeem(int userId, int bookingId, int points)
        {
            decimal discount = points * 1m;
            _repo.RedeemPoints(userId, bookingId, points, discount);
        }
    }
}
