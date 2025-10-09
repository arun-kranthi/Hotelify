using Microsoft.EntityFrameworkCore;

namespace SmartHotelBookingSystem.DTO.module_2.RoomDto
{
    public class RoomReadDto
    {
        public int RoomID { get; set; }
        public int HotelID { get; set; }
        public string Type { get; set; }
        
        public decimal Price { get; set; }
        public bool Availability { get; set; } = true;
        public string Features { get; set; }
    }
}
