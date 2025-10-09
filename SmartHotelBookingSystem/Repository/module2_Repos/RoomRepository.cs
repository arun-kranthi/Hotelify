using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public class RoomRepository : IRoomRepository
    {
        private readonly BookingDBContext _db;
        public RoomRepository(BookingDBContext db)
        {
            _db = db;
        }
        public async Task AddAsync(Room room)
        {
            await _db.Rooms.AddAsync(room);
        }
        public void Update(Room room)
        {
            _db.Rooms.Update(room);
        }
        public void Remove(Room room)
        {
            _db.Rooms.Remove(room);
        }

        public async Task<Room> GetByIdAsync(int id)
        {
            return await _db.Rooms.Include(h => h.Hotel).FirstOrDefaultAsync(h => h.RoomID == id);
        }
        public async Task<IEnumerable<Room>> SearchAsync(int? hotelId, string? type, decimal? minPrice, bool? availability)
        {
            var query = _db.Rooms.AsQueryable();

            if (hotelId.HasValue)
                query = query.Where(r => r.HotelID == hotelId.Value);

            if (!string.IsNullOrWhiteSpace(type))
                query = query.Where(r => r.Type.ToLower().Contains(type.ToLower()));

            if (minPrice.HasValue)
                query = query.Where(r => r.Price >= minPrice.Value);

            if (availability.HasValue)
                query = query.Where(r => r.Availability == availability.Value);

            return await query.Include(r => r.Hotel).ToListAsync();
        }
        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
        public async Task<IEnumerable<Room>> GetAllAsync()
        {
            return await _db.Rooms.Include(r => r.Hotel).ToListAsync();
        }

    }
}
