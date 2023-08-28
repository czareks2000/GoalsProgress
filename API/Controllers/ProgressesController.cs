using Application.Dto;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProgressesController : BaseApiController
    {
        private readonly IProgressesService _progressesService;

        public ProgressesController(IProgressesService progressesService)
        {
            _progressesService = progressesService;
        }

        [Authorize(Policy = "IsOwner")]
        [HttpPost("progresses/{goalId}")] //api/progresses/goalId
        public async Task<IActionResult> CreateProgress(int goalId, ProgressCreateUpdateDto progress)
        {
            return HandleResult(await _progressesService.Create(goalId, progress));
        }
        
        [HttpPut("progress/{progressId}")] //api/progress/progressId
        public async Task<IActionResult> UpdateProgress(int progressId, ProgressCreateUpdateDto progress)
        {
            return HandleResult(await _progressesService.Update(progressId, progress));
        }

        [HttpDelete("progress/{progressId}")] //api/progress/progressId
        public async Task<IActionResult> DeleteProgress(int progressId)
        {
            return HandleResult(await _progressesService.Delete(progressId));
        }
    }
}