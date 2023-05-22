using Application.Dto;

namespace Application.Interfaces
{
    public interface IGoalsService
    {
        Task<List<GoalDto>> GetAllGoalsAsync();
        Task<StandardGoalDto> GetStandardGoalAsync(int id);
        Task<ExtendedGoalDto> GetExtendedGoalAsync(int id);
    }
}