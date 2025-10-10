using Microsoft.EntityFrameworkCore;

namespace SmartHotelBookingSystem.DTO.module_2.RoomDto
{
    public class RoomUpdateDto
    {
        public string? Type { get; set; }
        
        public decimal? Price { get; set; }
        public bool? Availability { get; set; }
        public string? Features { get; set; }
    }
}
