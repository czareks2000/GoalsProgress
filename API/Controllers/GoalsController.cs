using Domain.Goals;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GoalsController : BaseApiController
    {
        [HttpGet("standardgoals")] //api/standardgoals
        public async Task<ActionResult<List<StandardGoal>>> GetStandardGoals()
        {
            return await Context.StandardGoals.ToListAsync();
        }
    }
}