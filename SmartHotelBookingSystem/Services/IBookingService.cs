using SmartHotelBookingSystem.DTO.module_3;

namespace SmartHotelBookingSystem.Services
{
    public interface IBookingService
    {
        Task<BookingResponseDto> CreateBookingAsync(CreateBookingDto dto);
        Task<BookingResponseDto> GetBookingAsync(int bookingId);
        Task CancelBookingAsync(int bookingId);
        Task<IEnumerable<UserBookingDto>> GetBookingsByUserIdAsync(int userId);
        Task<IEnumerable<BookingResponseDtoManager>> GetBookingsForManagerAsync(string managerId);
    }
}
