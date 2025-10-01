namespace SmartHotelBookingSystem.Model
{
    public class Hotel
    {
        public Guid HotelID { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string ManagerId { get; set; }
        public string Amenities { get; set; }
        public string Rating { get; set; }

        public User Manager { get; set; }
        public ICollection<Room> Rooms { get; set; }
    }
}
