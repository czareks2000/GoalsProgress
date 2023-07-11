using Domain;

namespace Persistence.Interfaces
{
    public interface IGoalsRepository
    {
        Task<int> Add(Goal goal);
        Task<List<Goal>> GetAll();
        Task<Goal> GetOne(int id);
        Task<int> Update(Goal goal);
        Task<int> Delete(int id);
    }
}