using Application.Dto;
using Application.Interfaces;
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

        [HttpPost("progresses/{goalId}")] //api/progresses/goalId
        public async Task<IActionResult> CreateProgress(int goalId, ProgressCreateDto progress)
        {
            return HandleResult(await _progressesService.Create(goalId, progress));
        }

        [HttpDelete("progress/{id}")] //api/progress/id
        public async Task<IActionResult> DeleteProgress(int id)
        {
            return HandleResult(await _progressesService.Delete(id));
        }
    }
}