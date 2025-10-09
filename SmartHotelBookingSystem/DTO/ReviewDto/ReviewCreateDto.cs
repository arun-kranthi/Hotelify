namespace SmartHotelBookingSystem.DTO.ReviewDto
{
    public class ReviewCreateDto
    {
        public int HotelID { get; set; }
        public int Rating { get; set; } 
        public string Comment { get; set; }
    }
}
