using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Redemption
    {
        [Key]
        public int RedemptionID { get; set; }
        public string UserID { get; set; }
        public string BookingID { get; set; }
        public int PointsUsed { get; set; }
        public decimal DiscountAmount { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }
    }
}
