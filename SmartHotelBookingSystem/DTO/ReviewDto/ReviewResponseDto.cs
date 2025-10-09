namespace SmartHotelBookingSystem.DTO.ReviewDto
{
    public class ReviewResponseDto
    {
        public int ReviewID { get; set; }
        public int UserID { get; set; }
        public int HotelID { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
