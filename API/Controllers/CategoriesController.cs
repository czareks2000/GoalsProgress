using Application.Dto;
using Application.Interfaces;
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

        [HttpPost("categories/{goalId}")] //api/categories/goalId
        public async Task<IActionResult> CreateCategory(
            int goalId, CategoryCreateUpdateDto newCategory)
        {
            return HandleResult(await _categoriesService.Create(goalId, newCategory));
        }

        [HttpDelete("categories/{id}")] //api/categories/id
        public async Task<IActionResult> DeleteCategory(int id)
        {
            return HandleResult(await _categoriesService.Delete(id));
        }
    }
}