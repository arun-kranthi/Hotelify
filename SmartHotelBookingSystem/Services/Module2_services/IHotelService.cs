using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public interface IHotelService
    {
        Task<Hotel> CreateAsync(Hotel hotel);
        Task<Hotel?> GetByIdAsync(Hotel hotel);

        Task<IEnumerable<Hotel>> GetAllAsync();

        Task UpdateAsync(Hotel hotel);
        Task DeleteAsync(int id);
        Task<IEnumerable<Hotel>> SearchAsync(string name, string location);
    }
}
