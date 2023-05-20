using Application.Dto;
using Application.Interfaces;
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
        public async Task<ActionResult<List<GoalDto>>> GetStandardGoals()
        {
            return await _goalService.GetAllGoalsAsync();
        }
    }
}