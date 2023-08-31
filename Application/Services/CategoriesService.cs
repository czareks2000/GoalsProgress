using Application.Core;
using Application.Dto;
using Application.Interfaces;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public CategoriesService(
            ICategoriesRepository categoriesRepository,
            IGoalsRepository goalsRepository,
            IProgressesRepository progressesRepository,
            IMapper mapper
        )
        {
            _goalsRepository = goalsRepository;
            _progressesRepository = progressesRepository;
            _mapper = mapper;
            _categoriesRepository = categoriesRepository;

        }

        public async Task<Result<List<CategoryDto>>> GetAll(int goalId)
        {   
            var goal = await _goalsRepository.GetOneAsync(goalId);

            if (goal == null)
                return Result<List<CategoryDto>>.Failure("Invalid goal id");

            var categories = _mapper.Map<List<CategoryDto>>(goal.Categories);
                
            return Result<List<CategoryDto>>.Sucess(categories);
        }

        public async Task<Result<int>> Create(int goalId, CategoryCreateUpdateDto newCategory)
        {
            var goal = await _goalsRepository.GetOneAsync(goalId);

            if (goal == null)
                return Result<int>.Failure("Invalid goal id");

            if (goal.Type == GoalType.Standard)
                return Result<int>.Failure("Standard goal can't have categories");

            var category = _mapper.Map<Category>(newCategory);

            category.Goal = goal;

            if (await _categoriesRepository.AddAsync(category) == 0)
                return Result<int>.Failure("Failed to create category");

            return Result<int>.Sucess(category.Id);
        }

        public async Task<Result<object>> Delete(int id)
        {
            var category = await _categoriesRepository.GetOneAsync(id);

            if (category == null)
                return null;

            if (!await CanBeDeleted(category))
                return Result<Object>.Failure("You cannot delete assigned category");

            if (await _categoriesRepository.DeleteAsync(id) == 0)
                return Result<Object>.Failure("Failed to delete category");
            
            return Result<Object>.Sucess(null);
        }

        private async Task<bool> CanBeDeleted(Category category) 
        {
            var progresses = await _progressesRepository.GetAllAsync();

            if (progresses.FirstOrDefault(p => p.Category == category) != null)
                return false;

            return true;
        }
    }
}