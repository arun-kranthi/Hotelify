using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.DTO.ReviewDto;
using SmartHotelBookingSystem.Model;
using System;

namespace SmartHotelBookingSystem.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly BookingDBContext _context;

        public ReviewRepository(BookingDBContext context)
        {
            _context=context;
        }

        public async Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId)
        {
            return await _context.Reviews
                .Include(r=>r.User)
                .Where(r=>r.HotelID==hotelId).ToListAsync();
        }

        public async Task AddReviewAsync(Review review)
        {
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        
        public async Task<Review> GetReviewByUserIdAsync(int UserId)
        {
            return await _context.Reviews.FirstOrDefaultAsync(r=>r.UserID==UserId);

        }


        public async Task<Review> GetReviewByReviewIdAsync(int reviewId)
        {
            return await _context.Reviews.FindAsync(reviewId);

        }
        public async Task UpdateReviewAsync(int reviewId)
        {
            var _review = await _context.Reviews.FindAsync(reviewId);
            if (_review!=null)
            {
                _context.Reviews.Update(_review);
                await _context.SaveChangesAsync();
            }
        }
        public async Task DeleteReviewAsync(int reviewId)
        {
            var _review = await _context.Reviews.FindAsync(reviewId);
            if (_review!=null)
            {
                _context.Reviews.Remove(_review);
                await _context.SaveChangesAsync();
            }
        }

        public double GetAverageRatingByHotelId(int hotelId)
        {
            var ratings=_context.Set<Review>()
                                  .Where(r=>r.HotelID==hotelId)
                                  .Select(r=>r.Rating);
            return ratings.Any()?ratings.Average():0.0;
        }

        
    }
}

