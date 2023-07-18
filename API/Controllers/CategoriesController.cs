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

        [HttpGet("categories")] //api/categories
        public async Task<IActionResult> GetCategories()
        {
            return HandleResult(await _categoriesService.GetAll());
        }
    }
}