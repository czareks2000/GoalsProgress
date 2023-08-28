using Application.Core;
using Application.Dto;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Persistence.Interfaces;

namespace Application.Services
{
    public class GoalsService : IGoalsService
    {
        private readonly IGoalsRepository _goalsRepository;
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;
   
        public GoalsService(IGoalsRepository goalsRepository, 
            UserManager<AppUser> userManager, 
            IUserAccessor userAccessor,
            IMapper mapper)
        {
            _userManager = userManager;
            _userAccessor = userAccessor;
            _goalsRepository = goalsRepository;
            _mapper = mapper;
        }

        public async Task<Result<List<GoalDto>>> GetAll()
        {   
            var allGoals = await _goalsRepository.GetAllAsync();

            var userGoals = allGoals.FindAll(g => 
                g.Status != GoalStatus.Deleted && 
                g.User.Email == _userAccessor.GetUserEmail());

            var goals = _mapper.Map<List<GoalDto>>(userGoals);

            return Result<List<GoalDto>>.Sucess(goals);
        }

        public async Task<Result<GoalDto>> GetOne(int id)
        {   
            var goal = await _goalsRepository.GetOneAsync(id);
            
            if (goal == null)
                return null;

            var result = _mapper.Map<GoalDto>(goal);

            return Result<GoalDto>.Sucess(result);
        }

        public async Task<Result<int>> Create(GoalCreateUpdateDto newGoal)
        {   
            var user = await _userManager.FindByEmailAsync(_userAccessor.GetUserEmail());

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
                ModificationDate = DateTime.UtcNow,
                CompletedDate = null,
                User = user
            };

            if (await _goalsRepository.AddAsync(goal) == 0)
                return Result<int>.Failure("Failed to create goal");
            
            return Result<int>.Sucess(goal.Id);
        }
        
        public async Task<Result<Object>> Update(int id, GoalCreateUpdateDto updatedGoal)
        {
            var goal = await _goalsRepository.GetOneAsync(id);

            if (goal == null || goal.Status == GoalStatus.Deleted)
                return null;
            
            goal.Name = updatedGoal.Name;
            goal.Description = updatedGoal.Description;
            goal.TargetValue = updatedGoal.TargetValue;
            goal.CustomUnit = updatedGoal.CustomUnit;
            goal.Unit = updatedGoal.Unit;
            goal.Deadline = updatedGoal.Deadline;
            goal.ModificationDate = DateTime.UtcNow;

            if (goal.CurrentValue < goal.TargetValue)
                goal.Status = GoalStatus.Current;
            else{
                goal.Status = GoalStatus.Completed;
                goal.CompletedDate = DateTime.UtcNow;
            }
            
            if (await _goalsRepository.UpdateAsync(goal) == 0)
                return Result<Object>.Failure("Failed to update goal");
            
            return Result<Object>.Sucess(null);
        }

        public async Task<Result<object>> UpdateStatus(int id, GoalStatus newStatus)
        {
            var goal = await _goalsRepository.GetOneAsync(id);

            if (goal == null)
                return null;

            goal.Status = newStatus;
            goal.ModificationDate = DateTime.UtcNow;

            if (await _goalsRepository.UpdateAsync(goal) == 0)
                return Result<Object>.Failure("Failed to update goal status");
            
            return Result<Object>.Sucess(null);
        }

        public async Task<Result<Object>> Delete(int id)
        {
            var goal = await _goalsRepository.GetOneAsync(id);

            if (goal == null || goal.Status == GoalStatus.Deleted)
                return null;

            goal.Status = GoalStatus.Deleted;
            goal.ModificationDate = DateTime.UtcNow;

            if (await _goalsRepository.UpdateAsync(goal) == 0)
                return Result<Object>.Failure("Failed to delete goal");
            
            return Result<Object>.Sucess(null);
        }
    }
}