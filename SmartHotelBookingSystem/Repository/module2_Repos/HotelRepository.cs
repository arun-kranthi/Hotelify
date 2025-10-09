
using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;
using System.Reflection.Metadata.Ecma335;
namespace SmartHotelBookingSystem.Repository.module2_Repos
{
    public class HotelRepository : IHotelRepository
    {
        private readonly BookingDBContext _db;

        

        public HotelRepository(BookingDBContext db)
        {
            _db = db;
        }
        public async Task<Hotel> AddAsync(Hotel hotel)
        {
            _db.Hotels.Add(hotel);
            await _db.SaveChangesAsync();
            return hotel;
        }

        public async Task DeleteAsync(Hotel hotel)
        {
            _db.Hotels.Remove(hotel);
            await _db.SaveChangesAsync();

        }
         
        public async Task<IEnumerable<Hotel>> GetAllAsync()
        {
            return await _db.Hotels.Include(h => h.Rooms ).ToListAsync();
        }

        public async Task<Hotel?> GetByIdAsync(int id)
        {
            return await _db.Hotels.Include(h => h.Rooms).FirstOrDefaultAsync(h => h.HotelID == id);

        }
        public async Task UpdateAsync(Hotel hotel)
        {
            _db.Hotels.Update(hotel);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Hotel>> SearchAsync(string? name,string? location)
        {
            var q = _db.Hotels.AsQueryable();
            if(! string.IsNullOrWhiteSpace(name)) q=q.Where(h =>h.Name.Contains(name));
            if(! string.IsNullOrWhiteSpace(location)) q=q.Where(h=>h.Location.Contains(location));
            return await q.Include(h=>h.Rooms).ToListAsync();
        }
    }
}
