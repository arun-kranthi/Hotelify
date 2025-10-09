using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.DTO.module_3;
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

        public Task CancelBookingAsync(int bookingId)
        {
            throw new NotImplementedException();
        }

        public Task<BookingResponseDto> CreateBookingAsync(CreateBookingDto dto)
        {
            throw new NotImplementedException();
        }

        public Task<BookingResponseDto> getBookingAsync(int bookingId)
        {
            throw new NotImplementedException();
        }
    }
}
