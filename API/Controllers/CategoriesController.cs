using Application.Dto;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly ICategoriesService _categoriesService;
        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [Authorize(Policy = "IsOwner")]
        [HttpPost("categories/{goalId}")] //api/categories/goalId
        public async Task<IActionResult> CreateCategory(
            int goalId, CategoryCreateUpdateDto newCategory)
        {
            return HandleResult(await _categoriesService.Create(goalId, newCategory));
        }

        [HttpDelete("categories/{categoryId}")] //api/categories/id
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            return HandleResult(await _categoriesService.Delete(categoryId));
        }
    }
}