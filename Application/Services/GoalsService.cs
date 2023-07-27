using Application.Core;
using Application.Dto;
using Application.Interfaces;
using Domain;
using Domain.Enums;
using Persistence.Interfaces;

namespace Application.Services
{
    public class GoalsService : IGoalsService
    {
        private readonly IGoalsRepository _goalsRepository;
   
        public GoalsService(IGoalsRepository goalsRepository)
        {
            _goalsRepository = goalsRepository;
        }

        public async Task<Result<List<Goal>>> GetAll()
        {   
            var goals = await _goalsRepository.GetAll();

            return Result<List<Goal>>.Sucess(goals.FindAll(g => g.Status != GoalStatus.Deleted));
        }

        public async Task<Result<Goal>> GetOne(int id)
        {   
            var goal = await _goalsRepository.GetOne(id);
            
            if (goal == null)
                return null;

            return Result<Goal>.Sucess(goal);
        }

        public async Task<Result<int>> Create(GoalCreateUpdateDto newGoal)
        {
            var goal = new Goal {
                Name = newGoal.Name,
                Description = newGoal.Description,
                CurrentValue = 0,
                TargetValue = newGoal.TargetValue,
                CustomUnit = newGoal.CustomUnit,
                Unit = newGoal.Unit,
                Deadline = newGoal.Deadline,
                Status = GoalStatus.Current,
                Type = newGoal.Type,
                ModificationDate = DateTime.UtcNow
            };

            if (await _goalsRepository.Add(goal) == 0)
                return Result<int>.Failure("Failed to create goal");
            
            return Result<int>.Sucess(goal.Id);
        }
        
        public async Task<Result<Object>> Update(int id, GoalCreateUpdateDto updatedGoal)
        {
            var goal = await _goalsRepository.GetOne(id);

            if (goal == null || goal.Status == GoalStatus.Deleted)
                return null;

            goal.Name = updatedGoal.Name;
            goal.Description = updatedGoal.Description;
            goal.TargetValue = updatedGoal.TargetValue;
            goal.CustomUnit = updatedGoal.CustomUnit;
            goal.Unit = updatedGoal.Unit;
            goal.Deadline = updatedGoal.Deadline;
            goal.ModificationDate = DateTime.UtcNow;

            if (await _goalsRepository.Update(goal) == 0)
                return Result<Object>.Failure("Failed to update goal");
            
            return Result<Object>.Sucess(null);
        }

        public async Task<Result<object>> UpdateStatus(int id, GoalStatus newStatus)
        {
            var goal = await _goalsRepository.GetOne(id);

            if (goal == null)
                return null;

            goal.Status = newStatus;
            goal.ModificationDate = DateTime.UtcNow;

            if (await _goalsRepository.Update(goal) == 0)
                return Result<Object>.Failure("Failed to update goal status");
            
            return Result<Object>.Sucess(null);
        }

        public async Task<Result<Object>> Delete(int id)
        {
            var goal = await _goalsRepository.GetOne(id);

            if (goal == null || goal.Status == GoalStatus.Deleted)
                return null;

            goal.Status = GoalStatus.Deleted;
            goal.ModificationDate = DateTime.UtcNow;

            if (await _goalsRepository.Update(goal) == 0)
                return Result<Object>.Failure("Failed to delete goal");
            
            return Result<Object>.Sucess(null);
        }
    }
}