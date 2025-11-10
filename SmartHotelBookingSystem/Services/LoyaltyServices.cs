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

        public decimal RedeemPointsForBooking(int userId, int pointsToRedeem)
        {
            if (pointsToRedeem <= 0)
            {
                return 0; // No points to redeem
            }

            var account = _repo.GetByUserId(userId);

            if (account == null || account.PointsBalance < pointsToRedeem)
            {
                throw new Exception("Not enough loyalty points.");
            }

            // Your logic: 1 point = 1 unit of currency
            decimal discount = pointsToRedeem * 1m;

            // Deduct the points
            account.PointsBalance -= pointsToRedeem;
            _repo.Update(account); // You will need to add an 'Update' method to your repository

            return discount;
        }
    }
}
