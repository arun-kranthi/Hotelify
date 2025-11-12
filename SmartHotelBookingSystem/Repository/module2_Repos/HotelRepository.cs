
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
        
        public async Task AddAsync(Hotel hotel)
        {

            await _db.Hotels.AddAsync(hotel);

        }

        public void Remove(Hotel hotel)
        {
            _db.Hotels.Remove(hotel);


        }

        public async Task<IEnumerable<Hotel>> GetAllAsync()
        {
            return await _db.Hotels.Include(h => h.Rooms).ToListAsync();
        }

        public async Task<Hotel?> GetByIdAsync(int id)
        {
            return await _db.Hotels.Include(h => h.Rooms).FirstOrDefaultAsync(h => h.HotelID == id);

        }
        public void Update(Hotel hotel)
        {
            _db.Hotels.Update(hotel);

        }

        public async Task<IEnumerable<Hotel>> SearchAsync(string? name, string? location ,double? minRating, double? maxRating)
        {
            var q = _db.Hotels.AsQueryable();
            if (!string.IsNullOrWhiteSpace(name)) q = q.Where(h => h.Name.Contains(name));
            if (!string.IsNullOrWhiteSpace(location)) q = q.Where(h => h.Location.Contains(location));
            return await q.Include(h => h.Rooms).ToListAsync();
        }
        public async Task<(IEnumerable<Hotel> Hotels, int TotalCount)> SearchAsync(
           string? name,
           string? location,
           double? minRating,
           double? maxRating,

           int page,
           int pageSize)
        {
            var query = _db.Hotels.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(h => h.Name.ToLower().Contains(name.ToLower()));

            if (!string.IsNullOrWhiteSpace(location))
                query = query.Where(h => h.Location.ToLower().Contains(location.ToLower()));

            if (minRating.HasValue)
                query = query.Where(h => h.Rating >= minRating.Value);

            if (maxRating.HasValue)
                query = query.Where(h => h.Rating <= maxRating.Value);



            int totalCount = await query.CountAsync();

            var hotels = await query
                .Include(h => h.Rooms)
                .OrderByDescending(h => h.Rating)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (hotels, totalCount);
        }

        public Task SaveChangesAsync()
        {
            return _db.SaveChangesAsync();
        }
        public async Task<IEnumerable<Hotel>> GetHotelsByManagerAsync(string managerId)
        {
            return await _db.Hotels
                .Where(h => h.ManagerId.ToString().Equals(managerId))
                .ToListAsync();
        }
    }

}