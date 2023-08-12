using Application.Core;
using Application.Dto;
using Domain;

namespace Application.Interfaces
{
    public interface IProgressesService
    {
        Task<Result<List<Progress>>> GetAll(int goalId);
        Task<Result<int>> Create(int goalId, ProgressCreateUpdateDto newProgress);
        Task<Result<Object>> Update(int id, ProgressCreateUpdateDto updatedProgress);
        Task<Result<Object>> Delete(int id); 
    }
}