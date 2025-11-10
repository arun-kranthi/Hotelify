namespace SmartHotelBookingSystem.DTO.module_3
{
    public class UserBookingDto
    {
        public int BookingID { get; set; }
        public string Status { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int HotelID { get; set; } // Needed for submitting a review
        public string HotelName { get; set; }
        public string RoomType { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
