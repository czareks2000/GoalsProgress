using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Interfaces;

namespace Persistence.Repositories
{
    public class GoalsRepository : IGoalsRepository
    {   
        private readonly DataContext _context;
        public GoalsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Goal goal)
        {
            await _context.AddAsync(goal);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Goal>> GetAll()
        {
            return await _context.Goals.ToListAsync();
        }

        public async Task<Goal> GetOne(int id)
        {
            return await _context.Goals.FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<int> Update(Goal goal)
        {
            _context.Goals.Update(goal);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {   
            var goal = await _context.Goals.FindAsync(id);

            _context.Goals.Remove(goal);

            return await _context.SaveChangesAsync();
        }
    }
}