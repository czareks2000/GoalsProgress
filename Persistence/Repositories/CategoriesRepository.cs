using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Interfaces;

namespace Persistence.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly DataContext _context;
        public CategoriesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(Category category)
        {
            await _context.AddAsync(category);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetOneAsync(int id)
        {
            return await _context.Categories
                .Include(c => c.Goal)
                .Include(c => c.Progresses)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<int> UpdateAsync(Category category)
        {
            _context.Categories.Update(category);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            _context.Categories.Remove(category);

            return await _context.SaveChangesAsync();
        }

        public string GetUserId(int categoryId)
        {
            var userId = _context.Categories
                .Where(c => c.Id == categoryId)
                .Select(c => c.Goal.User.Id)
                .FirstOrDefault();

            return userId;
        }
    }
}