using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Room
    {
        [Key]
        public int RoomID { get; set; }
        public int HotelID { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public bool Availability { get; set; }
        public string Features { get; set; }

        public Hotel Hotel { get; set; }
        public ICollection<Booking> Bookings { get; set; }


    }
}
