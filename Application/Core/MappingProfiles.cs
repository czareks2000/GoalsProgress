using Application.Dto;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Goal, GoalDto>();
            CreateMap<Progress, ProgressDto>();
            CreateMap<Category, CategoryDto>();

            CreateMap<GoalCreateUpdateDto, Goal>();
            CreateMap<ProgressCreateUpdateDto, Progress>();
            CreateMap<CategoryCreateUpdateDto, Category>();
        }
    }
}