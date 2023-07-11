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

        public async Task<int> Add(Progress progress)
        {
            await _context.Progresses.AddAsync(progress);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Progress>> GetAll(int goalId)
        {
            return await _context.Progresses
                    .Where(p => p.Goal.Id == goalId)
                    .Include(p => p.Category)
                    .ToListAsync();
        }

        public async Task<Progress> GetOne(int id)
        {
            return await _context.Progresses
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<int> Update(Progress progress)
        {
            _context.Progresses.Update(progress);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var progress = await _context.Progresses.FindAsync(id);

            _context.Progresses.Remove(progress);

            return await _context.SaveChangesAsync();
        }
    }
}