using AutoMapper;
using Microsoft.Identity.Client;
using SmartHotelBookingSystem.DTO.module_2;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository.module2_Repos;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _repository;
       
        private readonly IMapper _mapper;
        public HotelService(IHotelRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelReadDto>> GetAllAsync()
        {
            var hotels = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<HotelReadDto>>(hotels);
        }

        public async Task<HotelReadDto?> GetByIdAsync(int id)
        {
            var hotel =await  _repository.GetByIdAsync(id);
            return hotel == null? null : _mapper.Map<HotelReadDto>(hotel);
        }

        public async Task<HotelReadDto> CreateAsync(HotelCreateDto dto)
        {
            var hotel = _mapper.Map<Hotel>(dto);
            await _repository.AddAsync(hotel);
            await _repository.SaveChangesAsync();
            return _mapper.Map<HotelReadDto>(hotel);
        }

        public async Task UpdateAsync(int id,HotelUpdateDto dto)
        {
            
              var hotel = await _repository.GetByIdAsync(id);
                if(hotel == null)
                {
                    throw new KeyNotFoundException($"Hotel Not Found");
                }
                _mapper.Map(dto, hotel);
                _repository.Update(hotel);
                 await _repository.SaveChangesAsync();
        }
         

        public async Task DeleteAsync(int id)
        {
            var hotel= await _repository.GetByIdAsync(id);
            if(hotel == null)
            {
                throw new KeyNotFoundException($"Hotel Not Found");
            }
            _repository.Remove(hotel);
            await _repository.SaveChangesAsync();
        }
        public async Task<IEnumerable<HotelReadDto>> GetHotelsByManagerAsync(string managerId)
        {
            var hotels = await _repository.GetHotelsByManagerAsync(managerId);

            // Map entity → DTO
            return hotels.Select(h => new HotelReadDto
            {
                HotelID = h.HotelID,
                Name = h.Name,
                Location = h.Location,
                ManagerId = h.ManagerId.ToString(),
                Amenities = h.Amenities,
                Rating = h.Rating
            });
        }

    }
}
