using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.DTO.module_2.AuthenticationDtos
{
    public class RegisterDto
    {
        public string Name { get; set; }

       
        public string Email { get; set; }
       
        public string Password { get; set; }
        
    }
}
