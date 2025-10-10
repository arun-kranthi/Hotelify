using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Room
    {
        internal DateTime UpdatedAt;

        [Key]
        [Required]
        public int RoomID { get; set; }
        [Required]
        public int HotelID { get; set; }
        [Required]
        public string Type { get; set; }
        
        
        public decimal Price { get; set; }
        public bool Availability { get; set; } = true;
        public string Features { get; set; }

        public Hotel? Hotel { get; set; }
        public ICollection<Booking> Bookings { get; set; }


    }
}
