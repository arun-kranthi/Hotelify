using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.DTO
{
    public class UserCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password{ get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        [Phone]
        public string ContactNumber { get; set; }
    }
}
