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
        private readonly IProgressesRepository _progressesRepository;

        public CategoriesService(
            ICategoriesRepository categoriesRepository,
            IGoalsRepository goalsRepository,
            IProgressesRepository progressesRepository
        )
        {
            _goalsRepository = goalsRepository;
            _progressesRepository = progressesRepository;
            _categoriesRepository = categoriesRepository;

        }

        public async Task<Result<List<Category>>> GetAll(int goalId)
        {   
            var goal = await _goalsRepository.GetOne(goalId);

            if (goal == null)
                return Result<List<Category>>.Failure("Invalid goal id");

            var categories = goal.Categories;

            foreach (var category in categories)
            {
                category.Goal = null;
                category.Progresses = null;
            }
                
            return Result<List<Category>>.Sucess(categories.ToList());
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

            if (!await CanBeDeleted(category))
                return Result<Object>.Failure("You cannot delete assigned category");

            if (await _categoriesRepository.Delete(id) == 0)
                return Result<Object>.Failure("Failed to delete category");
            
            return Result<Object>.Sucess(null);
        }

        private async Task<bool> CanBeDeleted(Category category) 
        {
            var progresses = await _progressesRepository.GetAll();

            if (progresses.FirstOrDefault(p => p.Category == category) != null)
                return false;

            return true;
        }
    }
}