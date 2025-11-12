using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Services.Module2_services;

namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public interface IHotelRepository
    {
        Task<IEnumerable<Hotel>> GetAllAsync();
        

        Task<Hotel?> GetByIdAsync(int id);

        Task AddAsync(Hotel hotel);

        void Remove(Hotel hotel);
        void Update(Hotel hotel);

        Task<IEnumerable<Hotel>> SearchAsync(string? name, string? location, double? minRating, double? maxRating);
        Task SaveChangesAsync();
        Task<IEnumerable<Hotel>> GetHotelsByManagerAsync(string managerId);

    }
}
