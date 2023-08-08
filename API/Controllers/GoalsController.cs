using Application.Dto;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoalsController : BaseApiController
    {
        private readonly IGoalsService _goalsService;
        private readonly IProgressesService _progressesService;
        private readonly ICategoriesService _categoriesService;

        public GoalsController(
            IGoalsService goalsService, 
            IProgressesService progressesService,
            ICategoriesService categoriesService)
        {
            _goalsService = goalsService;
            _progressesService = progressesService;
            _categoriesService = categoriesService;
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

        [HttpGet("goal/{id}/categories")] //api/goal/id/categories
        public async Task<IActionResult> GetCategories(int id)
        {
            return HandleResult(await _categoriesService.GetAll(id));
        }

        [HttpGet("goal/{id}/progresses")] //api/goal/id/progresses
        public async Task<IActionResult> GetGoalProgresses(int id)
        {
            return HandleResult(await _progressesService.GetAll(id));
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

        [HttpPatch("goal/{id}/{status}")] //api/goal/id/status
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