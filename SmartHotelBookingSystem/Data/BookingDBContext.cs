using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Data
{
    public class BookingDBContext:DbContext
    {
        public BookingDBContext(DbContextOptions<BookingDBContext> options) : base(options)
        {
        }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<LoyaltyAccount> LoyaltyAccounts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Redemption> Redemptions { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Hotel>()
                .HasMany(h => h.Rooms)
                .WithOne(r => r.Hotel)
                .HasForeignKey(r => r.HotelID);
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserID);
            modelBuilder.Entity<Booking>()
                .HasOne(r=>r.Room)
                .WithMany(b=>b.Bookings)
                .HasForeignKey(r=>r.RoomID);
            modelBuilder.Entity<Payment>()
                .HasOne(b=>b.Booking)
                .WithOne(p=>p.Payment)
                .HasForeignKey<Payment>(b=>b.BookingID);
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserID);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserID);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Hotel)
                .WithMany(h=>h.Reviews)
                .HasForeignKey(r => r.HotelID);
            modelBuilder.Entity<LoyaltyAccount>()
                .HasOne(la => la.User)
                .WithOne(u => u.LoyaltyAccount)
                .HasForeignKey<LoyaltyAccount>(la => la.UserID);
            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.User)
                .WithMany(u => u.Redemptions)
                .HasForeignKey(r => r.UserID);
            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.Booking)
                .WithOne(b => b.Redemption)
                .HasForeignKey<Redemption>(r => r.BookingID);
        }
    }
}
