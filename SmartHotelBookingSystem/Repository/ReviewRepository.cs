using Microsoft.AspNetCore.Http.HttpResults;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Model;
using System;
using System.Data.Entity;

namespace SmartHotelBookingSystem.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly BookingDBContext _context;

        public ReviewRepository(BookingDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId)
        {
            return await _context.Reviews.Where(r => r.HotelID == hotelId).ToListAsync();
        }

        public async Task<Review> AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return review;
        }
        public async Task<Review> GetReviewByUserIdAsync(int UserId)
        {
            return await _context.Reviews.FindAsync(UserId);
            await _context.SaveChangesAsync();
        }


        public async Task<Review> GetReviewByReviewIdAsync(int reviewId)
        {
            return await _context.Reviews.FindAsync(reviewId);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateReviewAsync(int reviewId)
        {
            var _review = await _context.Reviews.FindAsync(reviewId);
                if (_review != null)
            {
                _context.Reviews.Update(_review);
                await _context.SaveChangesAsync();
            }
        }
        public async Task DeleteReviewAsync(int reviewId)
        {
            var _review = await _context.Reviews.FindAsync(reviewId);
                if (_review != null)
            {
                _context.Reviews.Remove(_review);
                await _context.SaveChangesAsync();
            }
        }
    }
}
