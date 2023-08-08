using Application.Core;
using Application.Dto;
using Application.Interfaces;
using Domain;
using Domain.Enums;
using Persistence.Interfaces;

namespace Application.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ICategoriesRepository _categoriesRepository;
        private readonly IGoalsRepository _goalsRepository;
        public CategoriesService(
            ICategoriesRepository categoriesRepository,
            IGoalsRepository goalsRepository
        )
        {
            _goalsRepository = goalsRepository;
            _categoriesRepository = categoriesRepository;

        }

        public async Task<Result<List<Category>>> GetAll(int goalId)
        {
            var categories = await _categoriesRepository.GetAll();
            
            categories = categories.Where(c => c.Goal.Id == goalId).ToList();

            foreach (var category in categories)
                category.Goal = null;

            return Result<List<Category>>.Sucess(categories);
        }

        public async Task<Result<int>> Create(int goalId, CategoryCreateUpdateDto newCategory)
        {
            var goal = await _goalsRepository.GetOne(goalId);

            if (goal == null)
                return Result<int>.Failure("Invalid goal id");

            if (goal.Type == GoalType.Standard)
                return Result<int>.Failure("Standard goal can't have categories");

            var category = new Category {
                Name = newCategory.Name,
                Multiplier = newCategory.Multiplier,
                Goal = goal
            };

            if (await _categoriesRepository.Add(category) == 0)
                return Result<int>.Failure("Failed to create category");

            return Result<int>.Sucess(category.Id);
        }

        public async Task<Result<object>> Delete(int id)
        {
            var category = await _categoriesRepository.GetOne(id);

            if (category == null)
                return null;

            if (await _categoriesRepository.Delete(id) == 0)
                return Result<Object>.Failure("Failed to delete category");
            
            return Result<Object>.Sucess(null);
        }
    }
}