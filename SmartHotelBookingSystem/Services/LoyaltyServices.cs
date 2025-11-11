using AutoMapper;
using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;
using System.Threading.Tasks;

namespace SmartHotelBookingSystem.Services
{
    public class LoyaltyServices : IloyaltyServices
    {
        private readonly ILoyaltyRepository _repo;
        private readonly IMapper _mapper;

        public LoyaltyServices(ILoyaltyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task AddPointsForBookingAsync(int userId, int bookingId)
        {
            await _repo.AddPointsAsync(userId, 10);
        }

        public async Task<LoyaltyAccountDto> GetAccountAsync(int userId)
        {
            var account = await _repo.GetByUserIdAsync(userId);
            return account == null ? null : _mapper.Map<LoyaltyAccountDto>(account);
        }

        public async Task<RedemptionResponseDto> RedeemAsync(int userId, int bookingId, int pointsUsed)
        {
            decimal discount = pointsUsed * 1m;
            await _repo.RedeemPointsAsync(userId, bookingId, pointsUsed, discount);

            return new RedemptionResponseDto
            {
                UserId = userId,
                BookingID = bookingId,
                PointsUsed = pointsUsed,
                DiscountAmount = discount
            };
        }
        public async Task<decimal> RedeemPointsForBooking(int userId, int pointsToRedeem)
        {
            if (pointsToRedeem <= 0)
            {
                return 0; // No points to redeem
            }

            var account = await _repo.GetByUserIdAsync(userId);

            if (account == null || account.PointsBalance < pointsToRedeem)
            {
                throw new Exception("Not enough loyalty points.");
            }

            // Your logic: 1 point = 1 unit of currency
            decimal discount = pointsToRedeem * 1m;

            // Deduct the points
            account.PointsBalance -= pointsToRedeem;
            _repo.Update(account); 

            return discount;
        }
    }
}

