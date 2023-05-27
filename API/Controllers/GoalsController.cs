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

        [HttpGet("goal/{id}")] //api/goal/id
        public async Task<ActionResult<GoalDto>> GetGoal(int id)
        {
            return await _goalService.GetGoalAsync(id);
        }
    }
}