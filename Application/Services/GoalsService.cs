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

            var standardGoals = await _repository.GetAllStandardGoalsAsync();

            foreach(var goal in standardGoals)
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
                    Type = GoalType.Standard
                });
            }

            var extendedGoals = await _repository.GetAllExtendedGoalsAsync();

            foreach(var goal in extendedGoals)
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
                    Type = GoalType.Extended
                });
            }

            return allGoals;
        }

        public async Task<StandardGoalDto> GetStandardGoalAsync(int id)
        {   
            var goal = await _repository.GetStandardGoalAsync(id);

            var goalDto = new StandardGoalDto
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
                Type = GoalType.Standard,
                Progresses = goal.Progresses.Select(progress => new StandardProgressDto
                {   
                    Id = progress.Id,
                    Value = progress.Value,
                    Date = progress.Date,
                    Description = progress.Description
                }
                ).ToList()
            };
                
            return goalDto;
        }

        public async Task<ExtendedGoalDto> GetExtendedGoalAsync(int id)
        {   
            var goal = await _repository.GetExtendedGoalAsync(id);

            Console.WriteLine(goal);

            var goalDto = new ExtendedGoalDto
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
                Type = GoalType.Extended,
                Progresses = goal.Progresses.Select(progress => new ExtendedProgressDto
                {
                    Id = progress.Id,
                    Value = progress.Value,
                    Date = progress.Date,
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