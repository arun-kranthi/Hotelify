using AutoMapper;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.DTO.module_2;
using SmartHotelBookingSystem.DTO.module_2.RoomDto;

namespace SmartHotelBookingSystem.Mappers
{
    public class Module2profile : Profile
    {
        public Module2profile() {
            CreateMap<Hotel, HotelReadDto>();
            CreateMap<HotelCreateDto, Hotel>();
            CreateMap<HotelUpdateDto, Hotel>();
            

            CreateMap<Room, RoomReadDto>();
            CreateMap<RoomCreateDto, Room>();
            CreateMap<RoomUpdateDto, Room>();

        }
    }
}
