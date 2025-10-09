using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public interface IRoomRepository
    {
        Task AddAsync(Room room);

        Task<IEnumerable<Room>> GetAllAsync();
        Task<Room?> GetByIdAsync(int id);
        
        void Update(Room room);
        void Remove(Room room);
        Task SaveChangesAsync();
        Task<IEnumerable<Room>> SearchAsync(int? hotelId, string? type, decimal? minPrice, bool? availability);
    }
}