using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Booking
    {
        [Key]
        public int BookingID { get; set; }
        public int UserID { get; set; }
        public int RoomID { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string Status { get; set; }
        public string PaymentID { get; set; }

        public User User { get; set; }
        public Room Room { get; set; }
        public Payment Payment { get; set; }
        public Redemption Redemption { get; set; }
    

    }
}
