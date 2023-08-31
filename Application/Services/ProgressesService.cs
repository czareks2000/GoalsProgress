using Application.Core;
using Application.Dto;
using Application.Interfaces;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public ProgressesService(
            IProgressesRepository progressesRepository,
            IGoalsRepository goalsRepository,
            ICategoriesRepository categoriesRepository,
            IMapper mapper)
        {
            _progressesRepository = progressesRepository;
            _goalsRepository = goalsRepository;
            _categoriesRepository = categoriesRepository;
            _mapper = mapper;
        }

        public async Task<Result<List<ProgressDto>>> GetAll(int goalId)
        {   
            var goal = await _goalsRepository.GetOneAsync(goalId);      

            var progresses = _mapper.Map<List<ProgressDto>>(goal.Progresses);

            return Result<List<ProgressDto>>.Sucess(progresses);
        }

        public async Task<Result<GoalDto>> Create(int goalId, ProgressCreateUpdateDto newProgress)
        {
            var goal = await _goalsRepository.GetOneAsync(goalId);

            if (goal == null)
                return Result<GoalDto>.Failure("Invalid goal id");

            Category category = null;
            
            if (goal.Type == GoalType.Extended)
            {
                category = await _categoriesRepository.GetOneAsync(newProgress.CategoryId);

                if (category == null)
                    return Result<GoalDto>.Failure("Invalid category id");
            }

            var progress = _mapper.Map<Progress>(newProgress);

            progress.Goal = goal;
            progress.Category = category;
            
            //update goal
            goal.CurrentValue += CalculateValue(progress);  
            goal = UpdateGoalStatus(goal);
            goal.ModificationDate = DateTime.UtcNow;

            //save changes
            if (await _progressesRepository.AddAsync(progress) == 0)
                return Result<GoalDto>.Failure("Failed to create progress");
            
            var result = _mapper.Map<GoalDto>(goal);

            return Result<GoalDto>.Sucess(result);
        }

        public async Task<Result<GoalDto>> Delete(int id)
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
                return Result<GoalDto>.Failure("Failed to delete progress");
            
            var updatedGoal = await _goalsRepository.GetOneAsync(goal.Id);

            var result = _mapper.Map<GoalDto>(updatedGoal);

            return Result<GoalDto>.Sucess(result);
        }

        public async Task<Result<GoalDto>> Update(int id, ProgressCreateUpdateDto updatedProgress)
        {
            var progress = await _progressesRepository.GetOneAsync(id);

            if (progress == null)
                return null;

            var goal = progress.Goal;
        
            //delete old progress
            goal.CurrentValue -= CalculateValue(progress);

            //update progress
            _mapper.Map(updatedProgress, progress);
            if (goal.Type == GoalType.Extended)
                progress.Category = await _categoriesRepository.GetOneAsync(updatedProgress.CategoryId);
            
            //update goal
            goal.CurrentValue += CalculateValue(progress);
            goal = UpdateGoalStatus(goal);
            goal.ModificationDate = DateTime.UtcNow;

            //save changes
            if (await _goalsRepository.UpdateAsync(goal) == 0)
                return Result<GoalDto>.Failure("Failed to update progress");
            
            var updatedGoal = await _goalsRepository.GetOneAsync(goal.Id);

            var result = _mapper.Map<GoalDto>(updatedGoal);

            return Result<GoalDto>.Sucess(result);
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
            {
                goal.Status = GoalStatus.Current;
                goal.CompletedDate = null;
            }
            else{
                goal.Status = GoalStatus.Completed;
                goal.CompletedDate = DateTime.UtcNow;
            }

            return goal;
        }
    }
}