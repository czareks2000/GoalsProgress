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
        private readonly IProgressesRepository _progressesRepository;
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsOwnerRequirementsHandler(
            IGoalsRepository goalsRepository,
            IProgressesRepository progressesRepository,
            ICategoriesRepository categoriesRepository, 
            IHttpContextAccessor httpContextAccessor)
        {
            _goalsRepository = goalsRepository;
            _progressesRepository = progressesRepository;
            _categoriesRepository = categoriesRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwnerRequirements requirement)
        {   
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            string ownerId = null;
                        
            if (RouteContainsKey("goalId"))
            {
                var goalId = GetRouteValue("goalId");
                ownerId = _goalsRepository.GetUserId(goalId);
            }
            else if (RouteContainsKey("progressId"))
            {
                var progressId = GetRouteValue("progressId");
                ownerId = _progressesRepository.GetUserId(progressId);
            }
            else if (RouteContainsKey("categoryId"))
            {
                var categoryId = GetRouteValue("categoryId");
                ownerId = _categoriesRepository.GetUserId(categoryId);
            }

            if (ownerId == null) return Task.CompletedTask;

            if (ownerId == userId) context.Succeed(requirement);

            return Task.CompletedTask;
        }

        private bool RouteContainsKey(string key)
        {
            return (bool)_httpContextAccessor.HttpContext?.Request.RouteValues.ContainsKey(key);
        }

        private int GetRouteValue(string key)
        {
            return int.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                    .SingleOrDefault(x => x.Key == key).Value.ToString());
        }
    }
}