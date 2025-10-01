namespace SmartHotelBookingSystem.Model
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public int UserID { get; set; }
        public int BookingID { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }

    }
}
