namespace SmartHotelBookingSystem.Model
{
    public class Payment
    {
        public Guid PaymentID { get; set; }
        public string UserID { get; set; }
        public string BookingID { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }

    }
}
