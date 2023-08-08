using Application.Core;
using Application.Dto;
using Domain;

namespace Application.Interfaces
{
    public interface ICategoriesService
    {
        Task<Result<List<Category>>> GetAll(int goalId);
        Task<Result<int>> Create(int goalID, CategoryCreateUpdateDto newCategory);
        Task<Result<Object>> Delete(int id);
    }
}