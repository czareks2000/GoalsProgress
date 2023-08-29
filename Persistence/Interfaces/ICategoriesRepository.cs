using Domain;

namespace Persistence.Interfaces
{
    public interface ICategoriesRepository
    {
        Task<int> AddAsync(Category category);
        Task<List<Category>> GetAllAsync();
        Task<Category> GetOneAsync(int id);
        Task<int> UpdateAsync(Category category);
        Task<int> DeleteAsync(int id);
        string GetUserId(int categoryId);
    }
}