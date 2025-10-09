using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace SmartHotelBookingSystem.Model
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }
        public int UserID { get; set; }
        public int BookingID { get; set; }
        [Precision(18,2)]
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }

        public User User { get; set; }
        public Booking Booking { get; set; }

    }
}
