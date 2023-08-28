using Application.Core;
using Application.Dto;
using Application.Interfaces;
using Domain;
using Domain.Enums;
using Persistence.Interfaces;

namespace Application.Services
{
    public class ProgressesService : IProgressesService
    {
        private readonly IProgressesRepository _progressesRepository;
        private readonly IGoalsRepository _goalsRepository;
        private readonly ICategoriesRepository _categoriesRepository;

        public ProgressesService(
            IProgressesRepository progressesRepository,
            IGoalsRepository goalsRepository,
            ICategoriesRepository categoriesRepository)
        {
            _progressesRepository = progressesRepository;
            _goalsRepository = goalsRepository;
            _categoriesRepository = categoriesRepository;
        }

        public async Task<Result<List<Progress>>> GetAll(int goalId)
        {   
            var goal = await _goalsRepository.GetOneAsync(goalId);      

            var progresses = goal.Progresses;

            foreach (var progress in progresses)
            {
                progress.Goal = null;
            }

            return Result<List<Progress>>.Sucess(progresses.ToList());
        }

        public async Task<Result<int>> Create(int goalId, ProgressCreateUpdateDto newProgress)
        {
            var goal = await _goalsRepository.GetOneAsync(goalId);

            if (goal == null)
                return Result<int>.Failure("Invalid goal id");

            Category category = null;
            
            if (goal.Type == GoalType.Extended)
            {
                category = await _categoriesRepository.GetOneAsync(newProgress.CategoryId);

                if (category == null)
                    return Result<int>.Failure("Invalid category id");
            }

            var progress = new Progress {
                Value = newProgress.Value,
                Description = newProgress.Description,
                Date = newProgress.Date,
                Goal = goal,
                Category = category
            };
            
            //update goal
            goal.CurrentValue += CalculateValue(progress);  
            goal = UpdateGoalStatus(goal);
            goal.ModificationDate = DateTime.UtcNow;

            //save changes
            if (await _progressesRepository.AddAsync(progress) == 0)
                return Result<int>.Failure("Failed to create progress");
            
            return Result<int>.Sucess(progress.Id);
        }

        public async Task<Result<Object>> Delete(int id)
        {
            var progress = await _progressesRepository.GetOneAsync(id);

            if (progress == null)
                return null;

            //update goal
            var goal = progress.Goal;
            goal.CurrentValue -= CalculateValue(progress);
            goal = UpdateGoalStatus(goal);
            goal.ModificationDate = DateTime.UtcNow;

            //save changes
            if (await _progressesRepository.DeleteAsync(id) == 0)
                return Result<Object>.Failure("Failed to delete progress");
            
            return Result<Object>.Sucess(null);
        }

        public async Task<Result<object>> Update(int id, ProgressCreateUpdateDto updatedProgress)
        {
            var progress = await _progressesRepository.GetOneAsync(id);

            if (progress == null)
                return null;

            var goal = progress.Goal;
        
            //delete old progress
            goal.CurrentValue -= CalculateValue(progress);

            //update progress
            progress.Value = updatedProgress.Value;
            progress.Description = updatedProgress.Description;
            progress.Date = updatedProgress.Date;
            if (goal.Type == GoalType.Extended)
                progress.Category = await _categoriesRepository.GetOneAsync(updatedProgress.CategoryId);
            
            //update goal
            goal.CurrentValue += CalculateValue(progress);
            goal = UpdateGoalStatus(goal);
            goal.ModificationDate = DateTime.UtcNow;

            //save changes
            if (await _goalsRepository.UpdateAsync(goal) == 0)
                return Result<Object>.Failure("Failed to update progress");
            
            return Result<Object>.Sucess(null);
        }

        private decimal CalculateValue(Progress progress)
        {   
            if (progress.Goal.Type == GoalType.Extended)
                return progress.Value * progress.Category.Multiplier;

            return progress.Value; 
        }

        private Goal UpdateGoalStatus(Goal goal)
        {
            if (goal.CurrentValue < goal.TargetValue)
                goal.Status = GoalStatus.Current;
            else{
                goal.Status = GoalStatus.Completed;
                goal.CompletedDate = DateTime.UtcNow;
            }

            return goal;
        }
    }
}