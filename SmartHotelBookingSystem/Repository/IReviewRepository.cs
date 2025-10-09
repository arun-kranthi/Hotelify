using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId);
        Task<Review>AddReviewAsync(Review review);
        Task<Review> GetReviewByIdAsync(int reviewId);
        Task<Review> GetReviewByUserIdAsync(int UserId);
    }
}
