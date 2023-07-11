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

        public async Task<int> Add(Category category)
        {
            await _context.AddAsync(category);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Category>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetOne(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<int> Update(Category category)
        {
            _context.Categories.Update(category);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            _context.Categories.Remove(category);

            return await _context.SaveChangesAsync();
        }
    }
}