using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public class RoomRepository : IRoomRepository
    {
        private readonly BookingDBContext _db;
        public RoomRepository(BookingDBContext db) {
            db = _db;
        }
        public async Task<Room> AddAsync(Room room)
        {
            _db.Rooms.Add(room);
            await _db.SaveChangesAsync();
            return room;
        }
        public async Task UpdateAsync(Room room)
        {
            _db.Rooms.Update(room);
            await _db.SaveChangesAsync();
            
           
        }
        public async Task DeleteAsync(Room room)
        {
            _db.Rooms.Remove(room);
            await _db.SaveChangesAsync();
            
        }

        public async Task<Room> GetIdByAsync(int id)
        {
            return await _db.Rooms.Include(h => h.Hotel).FirstOrDefaultAsync(h => h.RoomID == id);
        }
        public async Task<IEnumerable<Room>> GetByHotelIdAsync(int hotelId)
        {
            return await _db.Rooms.Where(r => r.HotelID == hotelId).ToListAsync();
        }

        public async Task<IEnumerable<Room>> SearchAvailabilityAsync(string? location,string? type,decimal? maxprice,decimal? minprice)
        {
            var q = _db.Rooms.Include(r => r.Hotel).Where(r => r.Availability);
            if(! string.IsNullOrWhiteSpace(type)) q =q.Where(r => r.Type.Contains(type));
            if (maxprice.HasValue) q = q.Where(r => r.Price >= maxprice.Value);
            if (minprice.HasValue) q = q.Where(r => r.Price < minprice.Value);
            if (!string.IsNullOrWhiteSpace(location)) q = q.Where(r => r.Hotel.Location.Contains(location));
            return await q.ToListAsync();
        }

    }
}
