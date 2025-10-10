namespace SmartHotelBookingSystem.DTO.module_2
{
    public class HotelReadDto
    {
        public int HotelID { get; set; }
        public string Name { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string ManagerId { get; set; }
        public string Amenities { get; set; }
        public double Rating { get; set; }
    }
}
