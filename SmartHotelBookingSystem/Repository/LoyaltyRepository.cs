using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartHotelBookingSystem.Repository
{
    public class LoyaltyRepository : ILoyaltyRepository
    {
        private readonly BookingDBContext _context;

        public LoyaltyRepository(BookingDBContext context)
        {
            _context = context;
        }

        public async Task<LoyaltyAccount> GetByUserIdAsync(int userId)
        {
            return await _context.LoyaltyAccounts.FirstOrDefaultAsync(u => u.UserID == userId);
        }

        public async Task AddPointsAsync(int userId, int points)
        {
            var account = await GetByUserIdAsync(userId);
            if (account == null)
            {
                account = new LoyaltyAccount
                {
                    UserID = userId,
                    PointsBalance = points,
                    LastUpdated = DateTime.UtcNow
                };
                await _context.LoyaltyAccounts.AddAsync(account);
            }
            else
            {
                account.PointsBalance += points;
                account.LastUpdated = DateTime.UtcNow;
                _context.LoyaltyAccounts.Update(account);
            }

            await _context.SaveChangesAsync();
        }

        public async Task RedeemPointsAsync(int userId, int bookingId, int points, decimal discount)
        {
            var account = await GetByUserIdAsync(userId);
            if (account == null || account.PointsBalance < points)
            {
                throw new InvalidOperationException("Insufficient points for redemption.");
            }

            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.BookingID == bookingId);
            if (booking == null)
            {
                throw new InvalidOperationException("No Bookings Found");
            }

            account.PointsBalance -= points;
            account.LastUpdated = DateTime.UtcNow;

            var redemption = new Redemption
            {
                UserID = userId,
                BookingID = bookingId,
                PointsUsed = points,
                DiscountAmount = discount
            };

            await _context.Redemptions.AddAsync(redemption);
            _context.LoyaltyAccounts.Update(account);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Redemption>> GetRedemptionsByUserIdAsync(int userId)
        {
            return await _context.Redemptions
                .Where(r => r.UserID == userId)
                .ToListAsync();
        }
        public void Update(LoyaltyAccount account)
        {
            _context.LoyaltyAccounts.Update(account);
            _context.SaveChanges();
        }
    }
}

