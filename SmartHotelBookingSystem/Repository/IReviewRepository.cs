using SmartHotelBookingSystem.DTO.ReviewDto;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId);
        Task<Review> GetReviewByUserIdAsync(int UserId);
        Task<Review> GetReviewByReviewIdAsync(int reviewId);
        Task AddReviewAsync(Review review);
        Task UpdateReviewAsync(int reviewId);
        Task DeleteReviewAsync(int id);
        double GetAverageRatingByHotelId(int hotelId);
        
    }
}
