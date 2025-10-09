using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId);
        Task<Review> AddReviewAsync(Review review);
        Task<Review> GetReviewByReviewIdAsync(int reviewId);
        Task<Review> GetReviewByUserIdAsync(int UserId);
        Task UpdateReviewAsync(int reviewId);
        Task DeleteReviewAsync(int reviewId);
    }
}
