namespace SmartHotelBookingSystem.Model
{
    public class LoyaltyAccount
    {
        public Guid LoyaltyID { get; set; }
        public string UserID { get; set; }
        public int PointsBalance { get; set; }
        public DateTime LastUpdated { get; set; }

        public User User { get; set; }

    }
}
