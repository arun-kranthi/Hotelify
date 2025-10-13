using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public interface IPaymentRepository
    {
        Task<Payment?> GetByIdAsync(int id);
        Task AddAsync(Payment payment);
        Task UpdateAsync(Payment payment);
        Task<Payment?> GetByBookingIdAsync(int bookingId);
    }
}
