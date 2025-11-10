using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public class LoyaltyRepository : ILoyaltyRepository
    {
        private readonly BookingDBContext _context;
        public LoyaltyRepository(BookingDBContext context)
        {
            _context = context;
        }

        public LoyaltyAccount GetByUserId(int userId)
        {
            return _context.LoyaltyAccounts.FirstOrDefault(u => u.UserID == userId);

        }
        public void AddPoints(int userId, int points)
        {
            var account=GetByUserId(userId);
            if (account == null)
            {
                account = new LoyaltyAccount
                {
                    UserID = userId,
                    PointsBalance = points,
                    LastUpdated = DateTime.UtcNow
                };
                _context.LoyaltyAccounts.Add(account);
            }
            else
            {
               account.PointsBalance += points;
                account.LastUpdated = DateTime.UtcNow;
                _context.LoyaltyAccounts.Update(account);
            }
            _context.SaveChanges();
        }

        public void RedeemPoints(int userId, int bookingId, int points, decimal discount)
        {
            var account=GetByUserId(userId);
            if(account == null || account.PointsBalance < points)
            {
                throw new InvalidOperationException("Insufficient points for redemption.");
            }
            var redemption = new Redemption
            {
                UserID = userId,
                BookingID = bookingId,
                PointsUsed = points,
                DiscountAmount = discount,
                
            };
            _context.Redemptions.Add(redemption);
            _context.LoyaltyAccounts.Update(account);
            _context.SaveChanges();
        }
        public void Update(LoyaltyAccount account)
        {
            _context.LoyaltyAccounts.Update(account);
            _context.SaveChanges();
        }
    }
}
