using Domain;

namespace Persistence.Interfaces
{
    public interface IGoalsRepository
    {
        Task<List<Goal>> GetAllGoalsAsync();
        Task<Goal> GetGoalAsync(int id);
    }
}