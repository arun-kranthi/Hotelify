using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public interface IRoomService
    {
        Task<Room> CreateAsync(Room room);
        Task<Room?> GetByIdAsync(int id);
        Task<IEnumerable<Room>> GetByHotelIdAsync(int hotelId);
        Task UpdateAsync(Room room);
        Task DeleteAsync(int id);

        Task<IEnumerable<Room>> SearchAvailableAsync(string? location, string? type, decimal? minprice, decimal? maxprice);
    }
}
