using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public interface IRoomRepository
    {
        Task<Room> AddAsync(Room room);
        Task<Room> GetIdByAsync(int id);
        Task<IEnumerable<Room>> GetByHotelIdAsync(int hotelId);
        Task UpdateAsync(Room room);
        Task DeleteAsync(Room room);
        Task<IEnumerable<Room>> SearchAvailabilityAsyc(string? location,string? type,decimal? minPrice,decimal? maxPrice);
    }
}
