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

        public async Task<int> AddAsync(Goal goal)
        {
            await _context.AddAsync(goal);

            return await _context.SaveChangesAsync();
        }

        public async Task<List<Goal>> GetAllAsync(string userEmail)
        {
            return await _context.Goals
                .Where(g => g.User.Email == userEmail)
                .Include(g => g.Categories)
                .Include(g => g.Progresses)
                .ToListAsync();
        }

        public async Task<Goal> GetOneAsync(int id)
        {
            return await _context.Goals
                .Include(g => g.Categories)
                .Include(g => g.Progresses)
                .Include(g => g.User)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public Goal GetOne(int id)
        {
            return _context.Goals
                .Include(g => g.User)
                .FirstOrDefault(g => g.Id == id);
        }

        public async Task<int> UpdateAsync(Goal goal)
        {
            _context.Goals.Update(goal);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {   
            var goal = await _context.Goals.FindAsync(id);

            _context.Goals.Remove(goal);

            return await _context.SaveChangesAsync();
        }

        public string GetUserId(int goalId)
        {
            var userId = _context.Goals
                .Where(g => g.Id == goalId)
                .Select(g => g.User.Id)
                .FirstOrDefault();

            return userId;
        }
    }
}