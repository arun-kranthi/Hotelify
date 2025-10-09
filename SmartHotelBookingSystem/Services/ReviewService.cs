using AutoMapper;
using SmartHotelBookingSystem.DTO.ReviewDto;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;

namespace SmartHotelBookingSystem.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _repository;
        private readonly IMapper _mapper;

        public ReviewService(IReviewRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReviewResponseDto>> GetReviewsForHotelAsync(int hotelId)
        {
            var reviews = await _repository.GetReviewsByHotelIdAsync(hotelId);
            return _mapper.Map<IEnumerable<ReviewResponseDto>>(reviews);
        }

        public async Task<ReviewResponseDto> SubmitReviewAsync(int userId, ReviewCreateDto dto)
        {
            var review = new Review
            {
                UserID = userId,
                HotelID = dto.HotelID,
                Rating = dto.Rating,
                Comment = dto.Comment,
                Timestamp = DateTime.UtcNow
            };

            var savedReview = await _repository.AddReviewAsync(review);
            return _mapper.Map<ReviewResponseDto>(savedReview);
        }
       /// public async Task FeedBackToReviewAsync(int reviewId, int managerId, string Response)
        //{
          //  var review = await _repository.GetReviewByReviewIdAsync(reviewId);
            //if (review == null) {
            //}
        //}
    } 
}
