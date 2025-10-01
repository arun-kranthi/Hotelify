namespace SmartHotelBookingSystem.Model
{
    public class Review
    {
        public int ReviewID { get; set; }
        public int UserID { get; set; }
        public int HotelID { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }

        public User User { get; set; }
        public Hotel Hotel { get; set; }

    }
}
