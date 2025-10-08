namespace SmartHotelBookingSystem.DTO.module_2.AuthenticationDtos
{
    public class AuthenricationResponseDto
    {
        public string Token { get; set; } = null;
        public string Role { get; set; } = null;
        public string Email { get; set; } = null;
    }
}
