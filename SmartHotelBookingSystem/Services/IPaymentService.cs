using SmartHotelBookingSystem.DTO.module_3;

namespace SmartHotelBookingSystem.Services
{
    public interface IPaymentService
    {
        Task<PaymentResponseDto> CreatePaymentAsync(CreatePaymentDto dto);
    }
}
