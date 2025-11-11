using AutoMapper;
using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Model;

namespace SmartHotelBookingSystem.Mappers
{
    public class LoyaltyProfile:Profile
    {
        public LoyaltyProfile()
        {
            //passing data from server to client
            CreateMap<LoyaltyAccount, LoyaltyAccountDto>();
            CreateMap<Redemption, RedemptionDto>();
            CreateMap<Redemption, RedemptionResponseDto>();

            //passing the data from client to server
            CreateMap<RedemptionDto, Redemption>();
            CreateMap<RedemptionRequestDto, Redemption>();

        }
    }
}
