using Domain;

namespace Persistence.Interfaces
{
    public interface IProgressesRepository
    {
        Task<int> Add(Progress progress);
        Task<List<Progress>> GetAll();
        Task<Progress> GetOne(int id);
        Task<int> Update(Progress progress);
        Task<int> Delete(int id);
    }
}