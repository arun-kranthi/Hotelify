namespace SmartHotelBookingSystem.DTO
{
    public class RedemptionResponseDto
    {
        public int UserId { get; set; }
        public int BookingID { get; set; }
        public decimal DiscountAmount { get; set; }
        public int PointsUsed { get; set; }
    }
}
