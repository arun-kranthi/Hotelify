using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Services.Module2_services;

namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public interface IHotelRepository
    {
        Task<Hotel> AddAsync(Hotel hotel);

        Task<Hotel?> GetByIdAsync(int id);

        Task<IEnumerable<Hotel>> GetAllAsync();

        Task DeleteAsync(Hotel hotel);
        Task UpdateAsync(Hotel hotel);

        Task<IEnumerable<Hotel>> SearchAsync(string? name, string? location);
        
    }
}
