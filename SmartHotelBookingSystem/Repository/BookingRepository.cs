using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly BookingDBContext _context;
        public BookingRepository(BookingDBContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();  
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            return await _context.Bookings
                .Include(b=> b.Room)
                .Include(b=> b.Payment)
                .FirstOrDefaultAsync(b=> b.BookingID == id);
        }

        public async Task<bool> IsRoomAvailableAsync(int rooomId, DateTime checkIn, DateTime checkOut)
        {
            return !await _context.Bookings
                .Where(b => b.RoomID == rooomId && b.Status == "Confirmed")
                .AnyAsync(b => b.CheckInDate < checkOut && b.CheckOutDate > checkIn);
        }

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId)
        {
            return await _context.Bookings
                .Include(b => b.Room)
                    .ThenInclude(r => r.Hotel) // Get the Hotel
                .Include(b => b.Payment)
                .Where(b => b.UserID == userId)
                .OrderByDescending(b => b.CheckInDate)
                .ToListAsync();
            
        }
        public async Task<IEnumerable<Booking>> GetBookingsByManagerAsync(string managerId)
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Room)
                    .ThenInclude(r => r.Hotel)
                .Include(b => b.Payment) // ✅ load Payment
                .Where(b => b.Room.Hotel.ManagerId == managerId)
                .OrderByDescending(b => b.CheckInDate)
                .ToListAsync();
        }

    }
}
