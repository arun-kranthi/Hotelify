using SmartHotelBookingSystem.DTO.module_3;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;

namespace SmartHotelBookingSystem.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepo;
        public PaymentService(IPaymentRepository paymentRepo)
        {
            _paymentRepo = paymentRepo;
        }
        public async Task<PaymentResponseDto> CreatePaymentAsync(CreatePaymentDto dto)
        {
            var payment = new Payment
            {
                UserID = dto.UserID,
                BookingID = dto.BookingID,
                Amount = dto.Amount,
                PaymentMethod = dto.PaymentMethod,
                Status = "Success"// mocking as successfull
            };
            await _paymentRepo.AddAsync(payment);
            return new PaymentResponseDto
            {
                PaymentID = payment.PaymentID,
                Status = payment.Status,
                PaymentMethod = payment.PaymentMethod,
                Amount = payment.Amount
            };
        }
    }
}
