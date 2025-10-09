namespace SmartHotelBookingSystem.DTO
{
    public class UserResponseDto
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string ContactNumber
        {
            get; set;
        }
    }
}
