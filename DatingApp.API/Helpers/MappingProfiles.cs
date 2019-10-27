using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //Model to DTo
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                   opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url); 
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
                });

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                   opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url); 
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(src => src.DateOfBirth.CalculateAge());
                });

                CreateMap<User, UserForUpdateDto>();
                CreateMap<Photo, PhotoForDetailedDto>();

            //Dto to Model
            CreateMap<UserForListDto, User>();
            CreateMap<UserForDetailedDto, User>();
            CreateMap<UserForUpdateDto, User>();
        }


    }
}