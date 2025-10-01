using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string ContactNumber { get; set; }
    }
}
