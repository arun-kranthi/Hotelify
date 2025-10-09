using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository.module2_Repos;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _repository;
        private readonly ILogger<HotelService> _logger;
        public HotelService(IHotelRepository repository, ILogger<HotelService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<Hotel> CreateAsync(Hotel hotel)
        {
            var created = await _repository.AddAsync(hotel);
            _logger.LogInformation("Created hotel {HotelID}", created.HotelID);
            return created;
        }
        public async Task DeleteAsync(int id)
        {
            var existing=await _repository.GetByIdAsync(id);
            if(existing == null)                
                throw new KeyNotFoundException($"Room Not Found");
            
            await _repository.DeleteAsync(existing);
            _logger.LogInformation("Deleted hotel {HotelID}",id);
        }

        public Task<IEnumerable<Hotel>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }
        public Task<Hotel?> GetByIdAsync(int id)
        {
            return _repository.GetByIdAsync(id);
        }
        public Task UpdateAsync(Hotel hotel)
        {
            hotel.UpdatedAt = DateTime.UtcNow;
            _logger.LogInformation("Updating Hotel {HotelId}", hotel.HotelID);
            return _repository .UpdateAsync(hotel);
        }
        public Task<IEnumerable<Hotel>> SearchAsync(string name, string location)
        {
            return _repository.SearchAsync(name, location);
        }
    }
}
