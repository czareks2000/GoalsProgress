using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence.Interfaces;

namespace Infrastructure.Security
{
    public class IsOwnerRequirements : IAuthorizationRequirement
    { 
    }

    public class IsOwnerRequirementsHandler : AuthorizationHandler<IsOwnerRequirements>
    {
        private readonly IGoalsRepository _goalsRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsOwnerRequirementsHandler(IGoalsRepository goalsRepository, 
            IHttpContextAccessor httpContextAccessor)
        {
            _goalsRepository = goalsRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwnerRequirements requirement)
        {   
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;
            
            var goalId = int.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "goalId").Value?.ToString());

            var goal = _goalsRepository.GetOne(goalId);

            if (goal == null) return Task.CompletedTask;

            if (goal.User.Id == userId) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}