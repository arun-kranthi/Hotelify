using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository.module2_Repos;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _Repo;
        private readonly ILogger<RoomService> _logger;
        public RoomService(IRoomRepository repo, ILogger<RoomService> logger)
        {
            _Repo = repo;
            _logger = logger;
        }
        public async Task<Room> CreateAsync(Room room)
        {
            var created = await _Repo.AddAsync(room);
            _logger.LogInformation("Created Room {RoomID}", created.RoomID);
            return created;
        }
        public async Task DeleteAsync(int id)
        {
            var existing = await _Repo.GetIdByAsync(id);
            if (existing == null)
                throw new KeyNotFoundException($"Room Not Found");
            await _Repo.DeleteAsync(existing);
            _logger.LogInformation("Deleted Room {RoomID}", id);
        }
        public Task<Room?> GetByIdAsync(int id)
        {
            return _Repo.GetIdByAsync(id);
        }
        public Task<IEnumerable<Room>> GetByHotelIdAsync(int hotelId)
        {
            return _Repo.GetByHotelIdAsync(hotelId);
        }
        public Task UpdateAsync(Room room)
        {
            room.UpdatedAt = DateTime.UtcNow;
            _logger.LogInformation("Updating Room {RoomId}", room.RoomID);
            return _Repo.UpdateAsync(room);
        }
        public Task<IEnumerable<Room>> SearchAvailableAsync(string? location, string? type, decimal? minprice, decimal? maxprice)
        {
            return _Repo.SearchAvailabilityAsyc(location, type, minprice, maxprice);
        }
    }
}
