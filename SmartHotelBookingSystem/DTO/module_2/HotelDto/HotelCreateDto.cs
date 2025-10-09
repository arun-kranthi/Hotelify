namespace SmartHotelBookingSystem.DTO.module_2
{
    public class HotelCreateDto
    {
        public string Name { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string ManagerId { get; set; }
        public string Amenities { get; set; }
    }
}
