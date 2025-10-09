using SmartHotelBookingSystem.DTO.module_2.RoomDto;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomReadDto>> GetAllAsync();

        Task<IEnumerable<RoomReadDto>> SearchAsync(int? hotelId, string? type, decimal? minprice, decimal? maxprice,bool? availability);
        Task<RoomReadDto?> GetByIdAsync(int id);
        Task<RoomReadDto> CreateAsync(RoomCreateDto dto);


        Task UpdateAsync(int id,RoomUpdateDto dto);
        Task DeleteAsync(int id);

    }
}
