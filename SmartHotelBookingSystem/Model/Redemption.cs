namespace SmartHotelBookingSystem.Model
{
    public class Redemption
    {
        public int RedemptionID { get; set; }
        public int UserID { get; set; }
        public int BookingID { get; set; }
        public int PointsUsed { get; set; }
        public decimal DiscountAmount { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }
    }
}
