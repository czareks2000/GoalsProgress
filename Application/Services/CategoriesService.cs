using Application.Core;
using Application.Interfaces;
using Domain;
using Persistence.Interfaces;

namespace Application.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ICategoriesRepository _categoriesRepository;
        public CategoriesService(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        public async Task<Result<List<Category>>> GetAll()
        {
            return Result<List<Category>>.Sucess(await _categoriesRepository.GetAll());
        }
    }
}