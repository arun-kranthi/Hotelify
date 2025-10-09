using AutoMapper;
using SmartHotelBookingSystem.DTO.module_2.RoomDto;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository.module2_Repos;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _Repo;
        private readonly IMapper _mapper;
        private readonly IHotelRepository _hotel;
        private readonly IRoomRepository _room;
        public RoomService(IRoomRepository repo, IMapper mapper,IHotelRepository hotel)
        {
            _Repo = repo;
            _mapper = mapper;
            _hotel = hotel;
        }
        public async Task<IEnumerable<RoomReadDto>> GetAllAsync()
        {
            var rooms = await _Repo.GetAllAsync();
            return _mapper.Map<IEnumerable<RoomReadDto>>(rooms);
        }
        public async Task<IEnumerable<RoomReadDto>> SearchAsync(int? hotelId, string? type, decimal? minprice, decimal? maxprice, bool? availability)
        {
            var rooms = await _Repo.SearchAsync(hotelId, type, minprice, availability);
            return _mapper.Map<IEnumerable<RoomReadDto>>(rooms);
        }
        public async Task<RoomReadDto?> GetByIdAsync(int id)
        {
            var room=await _Repo.GetByIdAsync(id);
            return room == null?null :_mapper.Map<RoomReadDto?>(room);
        }
        public async Task<RoomReadDto> CreateAsync(RoomCreateDto dto)
        {
            //check whether hotel exists
            var hotel = await _hotel.GetByIdAsync(dto.HotelID);
            if (hotel == null)
                throw new KeyNotFoundException($"Hotel Not Found");
            var room = _mapper.Map<Room>(dto);
            await _Repo.AddAsync(room);
            await _Repo.SaveChangesAsync();
            return _mapper.Map<RoomReadDto>(room);
        }
        public async Task UpdateAsync(int id,RoomUpdateDto dto)
        {
            var room = await _Repo.GetByIdAsync(id)?? throw new KeyNotFoundException("Room Not Found");
            _mapper.Map(dto, room);
            _Repo.Update(room);
            await _Repo.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var room = await _Repo.GetByIdAsync(id)?? throw new KeyNotFoundException("Room Not Found");
            _Repo.Remove(room);
            await _Repo.SaveChangesAsync();
        }
        
       
    }
}
