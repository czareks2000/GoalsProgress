using Application.Core;
using Domain;

namespace Application.Interfaces
{
    public interface ICategoriesService
    {
        Task<Result<List<Category>>> GetAll();
    }
}