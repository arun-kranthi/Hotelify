using Microsoft.Extensions.Configuration.UserSecrets;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.DTO.module_3;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;

namespace SmartHotelBookingSystem.Services
{
    public class BookingService: IBookingService
    {
        private readonly BookingDBContext _context;
        private readonly IBookingRepository _bookingRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IloyaltyServices _loyaltyService;
        public BookingService(BookingDBContext context,IBookingRepository bookingRepo, IPaymentRepository paymentRepo, IloyaltyServices loyaltyService)
        {
            _context = context;
            _bookingRepo = bookingRepo;
            _paymentRepo = paymentRepo;
            _loyaltyService = loyaltyService;
        }

        public async Task CancelBookingAsync(int bookingId)
        {
            //cancel boooking
            var booking = await _bookingRepo.GetByIdAsync(bookingId);
            if (booking == null)
            {
                throw new Exception("Booking not found.");
            }
            //confirm check
            if(booking.Status !="Confirmed")
            {
                throw new Exception("Only confirmed bookings can be cancelled.");

            }
            booking.Status = "Cancelled";
            await _bookingRepo.UpdateAsync(booking);

            var payment = await _paymentRepo.GetByBookingIdAsync(booking.BookingID);
            if (payment != null && payment.Status == "Success")
            {
                payment.Status = "Refunded";
                await _paymentRepo.UpdateAsync(payment);
            }
        }

        public async Task<BookingResponseDto> CreateBookingAsync(CreateBookingDto dto)
        {
            // Use a transaction to ensure data integrity
            // If redeeming points fails, the booking will roll back.
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 1. Get room
                var room = await _context.Rooms.FindAsync(dto.RoomID);
                if (room == null)
                {
                    throw new Exception("Room not found.");
                }

                // 2. Check availability
                bool available = await _bookingRepo.IsRoomAvailableAsync(dto.RoomID, dto.CheckInDate, dto.CheckOutDate);
                if (!available)
                {
                    throw new Exception("Room not available for selected dates.");
                }

                // 3. Calculate original price
                var originalTotal = (decimal)(dto.CheckOutDate - dto.CheckInDate).TotalDays * room.Price;

                // 4. --- NEW LOYALTY LOGIC ---
                // Call our new loyalty service method
                // (Assuming your UserID in the DTO can be parsed to int)
                int userId = dto.UserID;
                decimal discount = _loyaltyService.RedeemPointsForBooking(userId, dto.PointsToRedeem);

                // 5. Calculate final price
                decimal finalTotal = originalTotal - discount;
                if (finalTotal < 0)
                {
                    finalTotal = 0; // Price cannot be negative
                }

                // 6. Create payment with the *final* amount
                var payment = new Payment
                {
                    UserID = dto.UserID,
                    Amount = finalTotal, // Use the final discounted total
                    Status = "Success",
                    PaymentMethod = "Mock"
                };
                await _paymentRepo.AddAsync(payment);

                // 7. Create new booking
                var booking = new Booking
                {
                    UserID = dto.UserID,
                    RoomID = dto.RoomID,
                    CheckInDate = dto.CheckInDate,
                    CheckOutDate = dto.CheckOutDate,
                    Status = "Pending", // Set to pending first
                    PaymentID = payment.PaymentID.ToString()
                };
                await _bookingRepo.AddAsync(booking);

                // 8. Link booking and payment, then confirm
                payment.BookingID = booking.BookingID;
                booking.Status = "Confirmed";
                await _bookingRepo.UpdateAsync(booking);
                // We don't need to update payment again if it's already linked
                // by the BookingID property.

                // 9. --- (OPTIONAL) ADD POINTS FOR THIS BOOKING ---
                // Instead of a separate API call, why not grant points now?
                _loyaltyService.AddPointsForBooking(userId, booking.BookingID);

                // 10. Commit the transaction
                await transaction.CommitAsync();

                // 11. Return response to the user
                return new BookingResponseDto
                {
                    BookingID = booking.BookingID,
                    Status = booking.Status,
                    TotalAmount = finalTotal, // Return the final price
                    CheckInDate = booking.CheckInDate,
                    CheckOutDate = booking.CheckOutDate
                };
            }
            catch (Exception)
            {
                // If *anything* goes wrong, roll back all changes
                await transaction.RollbackAsync();
                throw; // Re-throw the exception to be caught by the controller
            }
        }

        public async Task<BookingResponseDto> GetBookingAsync(int bookingId)
        {
            var booking = await _bookingRepo.GetByIdAsync(bookingId);
            if (booking == null)
            {
                throw new Exception("Booking not found.");
            }
            decimal total = 0;
            if(booking.Room != null)
            {
                total = (decimal)(booking.CheckOutDate - booking.CheckInDate).TotalDays * booking.Room.Price;//check
            }

            return new BookingResponseDto
            {
                BookingID = booking.BookingID,
                Status = booking.Status,
                TotalAmount = total,
                CheckInDate = booking.CheckInDate,
                CheckOutDate = booking.CheckOutDate
            };
        }

        public async Task<IEnumerable<UserBookingDto>> GetBookingsByUserIdAsync(int userId)
        {
            var bookings = await _bookingRepo.GetByUserIdAsync(userId);

            return bookings.Select(b => new UserBookingDto
            {
                BookingID = b.BookingID,
                Status = b.Status,
                CheckInDate = b.CheckInDate,
                CheckOutDate = b.CheckOutDate,
                HotelID = b.Room.HotelID,
                HotelName = b.Room.Hotel?.Name ?? "Unknown Hotel",
                RoomType = b.Room?.Type ?? "Unknown Room",
                TotalAmount = b.Payment?.Amount ?? 0
            });
        }
    }
}
