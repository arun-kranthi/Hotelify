using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.DTO.module_3
{
    public class CreateBookingDto
    {
        [Required]
        public int UserID { get; set; }
        [Required]
        public int RoomID {get; set; }
        [Required]
        public DateTime CheckInDate { get; set; }
        [Required]
        public DateTime CheckOutDate { get; set; }
    }
}
