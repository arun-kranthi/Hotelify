using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.DTO.module_2;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;
using SmartHotelBookingSystem.Repository.module2_Repos;

namespace SmartHotelBookingSystem.Services.Module2_services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepository _repository;
        private readonly BookingDBContext _context;
        private readonly IReviewRepository _reviewRepo;
       
        private readonly IMapper _mapper;
        public HotelService(IHotelRepository repository, IMapper mapper, BookingDBContext context, IReviewRepository reviewRepo)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
            _reviewRepo = reviewRepo;
        }

        public async Task<IEnumerable<HotelReadDto>> GetAllAsync()
        {
            var hotels = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<HotelReadDto>>(hotels);
        }

        public async Task<HotelReadDto?> GetByIdAsync(int id)
        {
            var hotel =await  _repository.GetByIdAsync(id);
            var hotelDto = _mapper.Map<HotelReadDto>(hotel);
            hotelDto.Rating = _reviewRepo.GetAverageRatingByHotelId(id);
            return hotel == null ? null : hotelDto;
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


        public async Task<bool> DeleteAsync(int id)
        {
            var hotel = await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.HotelID == id);

            if (hotel == null)
                throw new KeyNotFoundException("Hotel not found.");

            // Check if any of the hotel's rooms have bookings
            var hasBookings = await _context.Bookings
                .AnyAsync(b => hotel.Rooms.Select(r => r.RoomID).Contains(b.RoomID));

            if (hasBookings)
                throw new InvalidOperationException("This hotel has existing bookings and cannot be deleted.");

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return true;
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
