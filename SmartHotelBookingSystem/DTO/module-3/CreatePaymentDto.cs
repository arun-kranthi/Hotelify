using System.ComponentModel.DataAnnotations;

namespace SmartHotelBookingSystem.DTO.module_3
{
    public class CreatePaymentDto
    {
        [Required] public int UserID {  get; set; }
        [Required] public int BookingID { get; set; }
        [Required] public decimal Amount {  get; set; }
        [Required] public string PaymentMethod {  get; set; }
    }
}
