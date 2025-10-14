namespace SmartHotelBookingSystem.DTO.module_3
{
    public class BookingResponseDto
    {
        public int BookingID {  get; set; }
        public string Status {  get; set; }
        public decimal TotalAmount {  get; set; }
        public DateTime CheckInDate {  get; set; }
        public DateTime CheckOutDate { get; set; }

    }
}
