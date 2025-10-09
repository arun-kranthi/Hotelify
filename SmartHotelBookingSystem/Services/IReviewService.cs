using SmartHotelBookingSystem.DTO.ReviewDto;

namespace SmartHotelBookingSystem.Services
{

    public interface IReviewService
    {
        Task<IEnumerable<ReviewDto>> GetReviewsByHotelAsync(int hotelId);

        Task<ReviewDto> AddReviewAsync(int userId, ReviewCreateDto dto);
        public HotelRatingDto GetAverageRating(int hotelId);

    }

}
