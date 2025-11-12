namespace SmartHotelBookingSystem.DTO.module_3
{
    public class BookingResponseDtoManager
    {
        public int BookingID { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }

        // Extra fields for manager view
        public string UserFullName { get; set; }
        public string RoomNumber { get; set; }
    }
}
