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

        public async Task<List<ExtendedGoal>> GetAllExtendedGoalsAsync()
        {
            return await _context.ExtendedGoals.ToListAsync();
        }

        public async Task<List<StandardGoal>> GetAllStandardGoalsAsync()
        {
            return await _context.StandardGoals.ToListAsync();
        }

        public async Task<ExtendedGoal> GetExtendedGoalAsync(int id)
        {
            return await _context.ExtendedGoals
                .Include(g => g.Progresses)
                    .ThenInclude(p => p.Category)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<StandardGoal> GetStandardGoalAsync(int id)
        {
            return await _context.StandardGoals
                .Include(g => g.Progresses)
                .FirstOrDefaultAsync(g => g.Id == id);
        }
    }
}