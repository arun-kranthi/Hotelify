using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.Model
{
    public class Hotel
    {
        [Key]
        public int HotelID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string ManagerId { get; set; }
        public string Amenities { get; set; }
        public double Rating { get; set; }

        public User? Manager { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public ICollection<Review> Reviews { get; set; }
        
    }
}
