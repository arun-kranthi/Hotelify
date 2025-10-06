using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string Name { get; set; }
        
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        [Phone]
        public string ContactNumber { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public LoyaltyAccount LoyaltyAccount { get; set; }
        public ICollection<Redemption> Redemptions { get; set; }
        public ICollection<Hotel> ManagedHotels { get; set; }
    }
}
