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
        public async Task<IEnumerable<ReviewDto>> GetReviewsByHotelAsync(int hotelId)
        {
            var _review=await _repository.GetReviewsByHotelIdAsync(hotelId);
            return _review.Select(r => new ReviewDto
            {
                ReviewId = r.ReviewID,
                HotelId = r.HotelID,
                Rating = r.Rating,
                Comment = r.Comment,
                UserId = r.UserID,
                UserName = r.User.Name
            });
        }
        public async Task<ReviewDto> AddReviewAsync(int userId, ReviewCreateDto dto)
        {
            if (dto.Rating < 1 || dto.Rating > 5) throw new ArgumentException("Rating must be between 1 and 5");
            var review = new Review
            {
                UserID = userId,
                HotelID = dto.HotelId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };
            await _repository.AddReviewAsync(review);


            return new ReviewDto
            {

                HotelId = dto.HotelId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };
        }
        public HotelRatingDto GetAverageRating(int hotelId)
        {
            var avgRating = _repository.GetAverageRatingByHotelId(hotelId);
            return new HotelRatingDto
            {
                HotelID = hotelId,
                AverageRating = avgRating
            };
        }

    }
}
