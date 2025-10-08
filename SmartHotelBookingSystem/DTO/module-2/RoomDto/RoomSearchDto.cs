namespace SmartHotelBookingSystem.DTO.module_2.RoomDto
{
    public class RoomSearchDto
    {
        public int? HotelId { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public DateTime CheckinDate { get; set; }
        public DateTime CheckoutDate { get; set; }
        public decimal MinimumPrice { get; set; }
        public decimal MaximumPrice { get; set; }
    }
}
