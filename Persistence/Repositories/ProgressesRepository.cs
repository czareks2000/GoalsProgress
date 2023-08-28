using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Interfaces;

namespace Persistence.Repositories
{
    public class ProgressesRepository : IProgressesRepository
    {
        private readonly DataContext _context;
        public ProgressesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(Progress progress)
        {
            await _context.Progresses.AddAsync(progress);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Progress>> GetAllAsync()
        {
            return await _context.Progresses.ToListAsync();
        }

        public async Task<Progress> GetOneAsync(int id)
        {
            return await _context.Progresses
                    .Include(p => p.Category)
                    .Include(p => p.Goal)
                    .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<int> UpdateAsync(Progress progress)
        {
            _context.Progresses.Update(progress);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            var progress = await _context.Progresses.FindAsync(id);

            _context.Progresses.Remove(progress);

            return await _context.SaveChangesAsync();
        }
    }
}