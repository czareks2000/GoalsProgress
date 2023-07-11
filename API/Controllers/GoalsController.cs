using Application.Dto;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoalsController : BaseApiController
    {
        private readonly IGoalsService _goalsService;
        public GoalsController(IGoalsService goalsService)
        {
            _goalsService = goalsService;
        }

        [HttpGet("goals")] //api/goals
        public async Task<IActionResult> GetGoals()
        {
            return HandleResult(await _goalsService.GetAll());
        }

        [HttpGet("goal/{id}")] //api/goal/id
        public async Task<IActionResult> GetGoal(int id)
        {
            return HandleResult(await _goalsService.GetOne(id));
        }

        [HttpPost("goals")] //api/goals
        public async Task<IActionResult> CreateGoal(GoalCreateUpdateDto goal)
        {
            return HandleResult(await _goalsService.Create(goal));
        }

        [HttpPut("goal/{id}")] //api/goal/id
        public async Task<IActionResult> UpdateGoal(int id, GoalCreateUpdateDto goal)
        {
            return HandleResult(await _goalsService.Update(id, goal));
        }

        [HttpPatch("goal/{id}")] //api/goal/id
        public async Task<IActionResult> UpdateGoalStatus(int id, GoalStatus status)
        {
            return HandleResult(await _goalsService.UpdateStatus(id, status));
        }

        [HttpDelete("goal/{id}")] //api/goal/id
        public async Task<IActionResult> DeleteGoal(int id)
        {
            return HandleResult(await _goalsService.Delete(id));
        }

    }
}