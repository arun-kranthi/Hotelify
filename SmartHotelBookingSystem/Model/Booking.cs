namespace SmartHotelBookingSystem.Model
{
    public class Booking
    {
        public Guid BookingID { get; set; }
        public string UserID { get; set; }
        public string RoomID { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string Status { get; set; }
        public string PaymentID { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }
        public Payment Payment { get; set; }

    }
}
