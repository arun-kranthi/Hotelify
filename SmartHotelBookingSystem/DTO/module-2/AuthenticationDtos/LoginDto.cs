using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.DTO.module_2.AuthenticationDtos
{
    public class LoginDto
    {
       
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}
