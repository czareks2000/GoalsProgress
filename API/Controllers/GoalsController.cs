using Application.Dto;
using Application.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Policy = "IsOwner")]
        [HttpGet("goal/{goalId}")] //api/goal/goalId
        public async Task<IActionResult> GetGoal(int goalId)
        {
            return HandleResult(await _goalsService.GetOne(goalId));
        }

        [Authorize(Policy = "IsOwner")]
        [HttpGet("goal/{goalId}/categories")] //api/goal/goalId/categories
        public async Task<IActionResult> GetCategories(int goalId)
        {
            return HandleResult(await _categoriesService.GetAll(goalId));
        }

        [Authorize(Policy = "IsOwner")]
        [HttpGet("goal/{goalId}/progresses")] //api/goal/goalId/progresses
        public async Task<IActionResult> GetGoalProgresses(int goalId)
        {
            return HandleResult(await _progressesService.GetAll(goalId));
        }

        [HttpPost("goals")] //api/goals
        public async Task<IActionResult> CreateGoal(GoalCreateUpdateDto goal)
        {
            return HandleResult(await _goalsService.Create(goal));
        }

        [Authorize(Policy = "IsOwner")]
        [HttpPut("goal/{goalId}")] //api/goal/goalId
        public async Task<IActionResult> UpdateGoal(int goalId, GoalCreateUpdateDto goal)
        {
            return HandleResult(await _goalsService.Update(goalId, goal));
        }

        [Authorize(Policy = "IsOwner")]
        [HttpPatch("goal/{goalId}/{status}")] //api/goal/goalId/status
        public async Task<IActionResult> UpdateGoalStatus(int goalId, GoalStatus status)
        {
            return HandleResult(await _goalsService.UpdateStatus(goalId, status));
        }

        [Authorize(Policy = "IsOwner")]
        [HttpDelete("goal/{goalId}")] //api/goal/goalId
        public async Task<IActionResult> DeleteGoal(int goalId)
        {
            return HandleResult(await _goalsService.Delete(goalId));
        }
    }
}