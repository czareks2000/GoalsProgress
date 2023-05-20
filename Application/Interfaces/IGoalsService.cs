using Application.Dto;

namespace Application.Interfaces
{
    public interface IGoalsService
    {
        Task<List<GoalDto>> GetAllGoalsAsync();
    }
}