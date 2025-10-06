using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Redemption
    {
        [Key]
        public int RedemptionID { get; set; }
        public int UserID { get; set; }
        public int BookingID { get; set; }
        public int PointsUsed { get; set; }
        [Precision(18, 2)]
        public decimal DiscountAmount { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }
    }
}
