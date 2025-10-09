using Microsoft.AspNetCore.Mvc;
using SmartHotelBookingSystem.DTO.ReviewDto;
using SmartHotelBookingSystem.Services;

namespace SmartHotelBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        // GET: api/review/hotel/{hotelId}
        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviewsByHotel(int hotelId)
        {
            var reviews = await _reviewService.GetReviewsByHotelAsync(hotelId);
            if (reviews == null || !reviews.Any())
                return NotFound($"No reviews found for hotel ID {hotelId}");

            return Ok(reviews);
        }

        // POST: api/review/{userId}
        [HttpPost("{userId}")]
        public async Task<ActionResult<ReviewDto>> AddReview(int userId, [FromBody] ReviewCreateDto dto)
        {
            try
            {
                var review = await _reviewService.AddReviewAsync(userId, dto);
                return CreatedAtAction(nameof(GetReviewsByHotel), new { hotelId = review.HotelId }, review);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/review/average-rating/{hotelId}
        [HttpGet("average-rating/{hotelId}")]
        public ActionResult<HotelRatingDto> GetAverageRating(int hotelId)
        {
            var rating = _reviewService.GetAverageRating(hotelId);
            return Ok(rating);
        }
    }
}