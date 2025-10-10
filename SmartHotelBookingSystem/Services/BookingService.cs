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

        public BookingService(BookingDBContext context,IBookingRepository bookingRepo, IPaymentRepository paymentRepo)
        {
            _context = context;
            _bookingRepo = bookingRepo;
            _paymentRepo = paymentRepo;
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
            //get room price -- changes needed by room repo
            var room = await _context.Rooms.FindAsync(dto.RoomID);
            if(room == null)
            {
                throw new Exception("Room not found.");
            }
            //check availability -- change it by using room repo
            bool available = await _bookingRepo.IsRoomAvailableAsync(dto.RoomID,dto.CheckInDate,dto.CheckOutDate);
            if(!available)
            {
                throw new Exception("Room not available for selected dates.");
            }
            var total = (decimal)(dto.CheckOutDate - dto.CheckInDate).TotalDays * room.Price;
            //now create new booking
            var booking = new Booking
            {
                UserID = dto.UserID,
                RoomID = dto.RoomID,
                CheckInDate = dto.CheckInDate,
                CheckOutDate = dto.CheckOutDate,
                Status = "Pending"
            };
            //add to  bookings table
            await _bookingRepo.AddAsync(booking);
            //create payment
            var payment = new Payment
            { 
                UserID = dto.UserID,
                BookingID = booking.BookingID,
                Amount = total,
                Status = "Success",//assuming success for mock payment for now.
                PaymentMethod = "Mock"
            };
            await _paymentRepo.AddAsync(payment);

            //link booking and payment
            booking.PaymentID = payment.PaymentID.ToString();
            booking.Status = "Confirmed";

            await _bookingRepo.UpdateAsync(booking);
            //return booking dto the user
            return new BookingResponseDto
            { 
                BookingID = booking.BookingID,
                Status = booking.Status,
                TotalAmount = total,
                CheckInDate = booking.CheckInDate,
                CheckOutDate = booking.CheckOutDate
            };

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
    }
}
