using Application.Dto;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class GoalsService : IGoalsService
    {
        private readonly DataContext _context;
        public GoalsService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<GoalDto>> GetAllGoalsAsync()
        {   
            var allGoals = new List<GoalDto>();

            var standardGoals = await _context.StandardGoals.ToListAsync();

            foreach(var goal in standardGoals)
            {
                allGoals.Add(new GoalDto()
                {
                    Id = goal.Id,
                    Name = goal.Name,
                    Description = goal.Description,
                    CurrentValue = goal.CurrentValue,
                    TargetValue = goal.TargetValue,
                    CustomUnit = goal.CustomUnit,
                    Unit = goal.Unit,
                    Deadline = goal.Deadline,
                    Status = goal.Status,
                    Type = GoalType.Standard
                });
            }

            var extendedGoals = await _context.ExtendedGoals.ToListAsync();

            foreach(var goal in extendedGoals)
            {
                allGoals.Add(new GoalDto()
                {
                    Id = goal.Id,
                    Name = goal.Name,
                    Description = goal.Description,
                    CurrentValue = goal.CurrentValue,
                    TargetValue = goal.TargetValue,
                    CustomUnit = goal.CustomUnit,
                    Unit = goal.Unit,
                    Deadline = goal.Deadline,
                    Status = goal.Status,
                    Type = GoalType.Extended
                });
            }

            return allGoals;
        }
    }
}