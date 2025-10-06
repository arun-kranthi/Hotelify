using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Data
{
    public class BookingDBContext : DbContext
    {
        public BookingDBContext(DbContextOptions<BookingDBContext> options) : base(options)
        {
        }

        // DbSet properties represent tables in the database
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<LoyaltyAccount> LoyaltyAccounts { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Redemption> Redemptions { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }

        // Configures relationships and constraints using Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();
            // One Hotel has many Rooms; each Room belongs to one Hotel
            modelBuilder.Entity<Hotel>()
                .HasMany(h => h.Rooms)
                .WithOne(r => r.Hotel)
                .HasForeignKey(r => r.HotelID);

            // One User can have many Bookings; each Booking belongs to one User
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // One Room can have many Bookings; each Booking is for one Room
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room)
                .WithMany(r => r.Bookings)
                .HasForeignKey(b => b.RoomID);

            // One Booking has one Payment; each Payment is for one Booking
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Booking)
                .WithOne(b => b.Payment)
                .HasForeignKey<Payment>(p => p.BookingID)
                .OnDelete(DeleteBehavior.Restrict);

            // One User can make many Payments; each Payment is made by one User
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // One User can write many Reviews; each Review is written by one User
            modelBuilder.Entity<Review>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // One Hotel can have many Reviews; each Review is for one Hotel
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Hotel)
                .WithMany(h => h.Reviews)
                .HasForeignKey(r => r.HotelID);

            // One User has one LoyaltyAccount; each LoyaltyAccount belongs to one User
            modelBuilder.Entity<LoyaltyAccount>()
                .HasOne(la => la.User)
                .WithOne(u => u.LoyaltyAccount)
                .HasForeignKey<LoyaltyAccount>(la => la.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // One User can have many Redemptions; each Redemption is made by one User
            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.User)
                .WithMany(u => u.Redemptions)
                .HasForeignKey(r => r.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // One Booking has one Redemption; each Redemption is for one Booking
            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.Booking)
                .WithOne(b => b.Redemption)
                .HasForeignKey<Redemption>(r => r.BookingID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}