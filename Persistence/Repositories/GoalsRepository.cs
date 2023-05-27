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

        public async Task<List<Goal>> GetAllGoalsAsync()
        {
            return await _context.Goals.ToListAsync();
        }

        public async Task<Goal> GetGoalAsync(int id)
        {
            return await _context.Goals
                .Include(g => g.Progresses)
                .FirstOrDefaultAsync(g => g.Id == id);
        }
    }
}