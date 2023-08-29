using Domain;

namespace Persistence.Interfaces
{
    public interface IGoalsRepository
    {
        Task<int> AddAsync(Goal goal);
        Task<List<Goal>> GetAllAsync();
        Task<Goal> GetOneAsync(int id);
        Goal GetOne(int id);
        Task<int> UpdateAsync(Goal goal);
        Task<int> DeleteAsync(int id);
        string GetUserId(int goalId);
    }
}