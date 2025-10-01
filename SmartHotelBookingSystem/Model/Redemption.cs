namespace SmartHotelBookingSystem.Model
{
    public class Redemption
    {
        public Guid RedemptionID { get; set; }
        public string UserID { get; set; }
        public string BookingID { get; set; }
        public int PointsUsed { get; set; }
        public decimal DiscountAmount { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }
    }
}
