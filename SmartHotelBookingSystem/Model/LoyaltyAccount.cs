using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class LoyaltyAccount
    {
        [Key]
        public int LoyaltyID { get; set; }
        public int UserID { get; set; }
        public int PointsBalance { get; set; }
        public DateTime LastUpdated { get; set; }

        public User User { get; set; }

    }
}
