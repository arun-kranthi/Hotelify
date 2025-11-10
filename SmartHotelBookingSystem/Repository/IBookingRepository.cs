using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public interface IBookingRepository
    {
        Task<Booking?> GetByIdAsync(int id);
        Task AddAsync(Booking booking);
        Task UpdateAsync(Booking booking);
        Task<bool> IsRoomAvailableAsync(int rooomId, DateTime checkIn, DateTime checkOut);

        Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);
    }
}
