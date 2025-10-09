using SmartHotelBookingSystem.DTO.module_2;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public interface IHotelService
    {
        Task<IEnumerable<HotelReadDto>> GetAllAsync();
        Task<HotelReadDto?> GetByIdAsync(int id);
        Task<HotelReadDto> CreateAsync(HotelCreateDto dto);
        

        

        Task UpdateAsync(int id ,HotelUpdateDto dto);
        Task DeleteAsync(int id);
        
    }
}
