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

            CreateMap<Goal, GoalCsvDto>();
            CreateMap<Progress, ProgressCsvDto>()
                .ForMember(d => d.GoalId, o => o
                    .MapFrom(s => s.Goal.Id))
                .ForMember(d => d.CategoryId, o => o
                    .MapFrom(s => s.Category.Id));
            CreateMap<Category, CategoryCsvDto>()
                .ForMember(d => d.GoalId, o => o
                    .MapFrom(s => s.Goal.Id));
        }
    }
}