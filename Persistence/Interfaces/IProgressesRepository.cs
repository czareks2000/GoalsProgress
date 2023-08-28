using Domain;

namespace Persistence.Interfaces
{
    public interface IProgressesRepository
    {
        Task<int> AddAsync(Progress progress);
        Task<List<Progress>> GetAllAsync();
        Task<Progress> GetOneAsync(int id);
        Task<int> UpdateAsync(Progress progress);
        Task<int> DeleteAsync(int id);
    }
}