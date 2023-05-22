using Application.Dto;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoalsController : BaseApiController
    {
        private readonly IGoalsService _goalService;
        public GoalsController(IGoalsService goalService)
        {
            _goalService = goalService;
        }

        [HttpGet("goals")] //api/goals
        public async Task<ActionResult<List<GoalDto>>> GetAllGoals()
        {
            return await _goalService.GetAllGoalsAsync();
        }

        [HttpGet("goal/1/{id}")] //api/goal/1/id
        public async Task<ActionResult<StandardGoalDto>> GetStandardGoal(int id)
        {
            return await _goalService.GetStandardGoalAsync(id);
        }

        [HttpGet("goal/2/{id}")] //api/goal/2/id
        public async Task<ActionResult<ExtendedGoalDto>> GetExtendedGoal(int id)
        {
            return await _goalService.GetExtendedGoalAsync(id);
        }
    }
}