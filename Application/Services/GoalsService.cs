using Application.Dto;
using Application.Interfaces;
using Domain.Enums;
using Persistence.Interfaces;

namespace Application.Services
{
    public class GoalsService : IGoalsService
    {
        private readonly IGoalsRepository _repository;
   
        public GoalsService(IGoalsRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<GoalDto>> GetAllGoalsAsync()
        {   
            var allGoals = new List<GoalDto>();

            var goals = await _repository.GetAllGoalsAsync();

            foreach(var goal in goals)
            {
                if (goal.Status == GoalStatus.Deleted)
                    continue;

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
                    Type = goal.Type
                });
            }

            return allGoals;
        }

        public async Task<GoalDto> GetGoalAsync(int id)
        {   
            var goal = await _repository.GetGoalAsync(id);

            var goalDto = new GoalDto
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
                Type = goal.Type,
                Progresses = goal.Progresses.Select(progress => new ProgressDto
                {   
                    Id = progress.Id,
                    Value = progress.Value,
                    Date = progress.Date,
                    Description = progress.Description,
                    Category = new CategoryDto
                    {
                        Id = progress.Category.Id,
                        Name = progress.Category.Name,
                        Multiplier = progress.Category.Multiplier
                    }
                }
                ).ToList()
            };
                
            return goalDto;
        }
    }
}