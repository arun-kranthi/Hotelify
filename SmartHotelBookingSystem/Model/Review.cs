using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }
        public string UserID { get; set; }
        public string HotelID { get; set; }
        public string Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }

        public User User { get; set; }
        public Hotel Hotel { get; set; }

    }
}
