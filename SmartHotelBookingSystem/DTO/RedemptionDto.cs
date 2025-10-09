namespace SmartHotelBookingSystem.DTO
{
    public class RedemptionDto
    {
        public int UserID { get; set; }
        public int BookingID { get; set; }
        public int PointsUsed { get; set; }
        public decimal DiscountAmount { get; set; }
    }
}
