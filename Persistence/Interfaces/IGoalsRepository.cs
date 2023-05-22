using Domain;

namespace Persistence.Interfaces
{
    public interface IGoalsRepository
    {
        Task<List<StandardGoal>> GetAllStandardGoalsAsync();
        Task<List<ExtendedGoal>> GetAllExtendedGoalsAsync();
        Task<StandardGoal> GetStandardGoalAsync(int id);
        Task<ExtendedGoal> GetExtendedGoalAsync(int id);
    }
}