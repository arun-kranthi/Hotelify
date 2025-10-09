using SmartHotelBookingSystem.DTO.ReviewDto;

namespace SmartHotelBookingSystem.Services
{

    public interface IReviewService
    {
        Task<IEnumerable<ReviewResponseDto>> GetReviewsForHotelAsync(int hotelId);
        Task<ReviewResponseDto> SubmitReviewAsync(int userId, ReviewCreateDto dto);
        //Task FeedBackToReviewAsync(int reviewId, int managerId, string Response);
    }

}
