using Domain;

namespace Persistence.Interfaces
{
    public interface ICategoriesRepository
    {
        Task<int> Add(Category category);
        Task<List<Category>> GetAll();
        Task<Category> GetOne(int id);
        Task<int> Update(Category category);
        Task<int> Delete(int id);
    }
}