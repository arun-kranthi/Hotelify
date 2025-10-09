using System.Collections;

namespace SmartHotelBookingSystem.DTO.ReviewDto
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }
        public int HotelId { get; set; }
        public int Rating { get; set; }
        public DateTime Timestamp { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public IEnumerable Responses { get; set; }
    }
}
