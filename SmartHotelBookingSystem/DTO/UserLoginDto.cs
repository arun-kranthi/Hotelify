using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace SmartHotelBookingSystem.DTO
{
    public class UserLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
