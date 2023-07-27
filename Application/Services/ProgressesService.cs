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
            var progresses = await _progressesRepository.GetAll(goalId);

            return Result<List<Progress>>.Sucess(progresses);
        }

        public async Task<Result<int>> Create(int goalId, ProgressCreateDto newProgress)
        {
            var goal = await _goalsRepository.GetOne(goalId);

            if (goal == null)
                return Result<int>.Failure("Invalid goal id");

            Category category = null;
            
            if (goal.Type == GoalType.Extended)
            {
                category = await _categoriesRepository.GetOne(newProgress.CategoryId);

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

            if (goal.Type == GoalType.Standard)
                goal.CurrentValue += progress.Value; 
            else if (goal.Type == GoalType.Extended)
                goal.CurrentValue += progress.Value * category.Multiplier; 

            goal.ModificationDate = DateTime.UtcNow;

            if (await _progressesRepository.Add(progress) == 0)
                return Result<int>.Failure("Failed to create progress");
            
            return Result<int>.Sucess(progress.Id);
        }

        public async Task<Result<Object>> Delete(int id)
        {
            var progress = await _progressesRepository.GetOne(id);

            if (progress == null)
                return null;

            var goal = progress.Goal;

            if (goal.Type == GoalType.Standard)
                goal.CurrentValue -= progress.Value; 
            else if (goal.Type == GoalType.Extended)
                goal.CurrentValue -= progress.Value * progress.Category.Multiplier; 

            goal.ModificationDate = DateTime.UtcNow;

            if (await _progressesRepository.Delete(id) == 0)
                return Result<Object>.Failure("Failed to delete progress");
            
            return Result<Object>.Sucess(null);
        }
    }
}