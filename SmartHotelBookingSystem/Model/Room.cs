namespace SmartHotelBookingSystem.Model
{
    public class Room
    {
        public int RoomID { get; set; }
        public int HotelID { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public bool Availability { get; set; }
        public string Features { get; set; }

        public Hotel Hotel { get; set; }

    }
}
