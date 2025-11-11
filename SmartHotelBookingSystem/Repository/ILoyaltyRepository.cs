
using SmartHotelBookingSystem.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartHotelBookingSystem.Repository
{
    public interface ILoyaltyRepository
    {
        Task<LoyaltyAccount> GetByUserIdAsync(int userId);
        Task AddPointsAsync(int userId, int points);
        Task RedeemPointsAsync(int userId, int bookingId, int points, decimal discount);
        Task<List<Redemption>> GetRedemptionsByUserIdAsync(int userId);
        void Update(LoyaltyAccount account);
    }
}

