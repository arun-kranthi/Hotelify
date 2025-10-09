using AutoMapper;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.DTO.module_2;
using SmartHotelBookingSystem.DTO.module_2.RoomDto;

namespace SmartHotelBookingSystem.Mappers
{
    public class Module2profile : Profile
    {
        public Module2profile() {
            CreateMap<Hotel, HotelcreateDto>();
            CreateMap<HotelReadDto, Hotel>();
            CreateMap<HotelUpdateDto, Hotel>();

            CreateMap<Room, RoomCreateDto>();
            CreateMap<RoomReadDto, Room>();
            CreateMap<RoomUpdateDto, Hotel>();

        }
    }
}
