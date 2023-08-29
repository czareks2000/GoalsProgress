using Application.Core;
using Application.Dto;
using Domain;

namespace Application.Interfaces
{
    public interface IProgressesService
    {
        Task<Result<List<ProgressDto>>> GetAll(int goalId);
        Task<Result<GoalDto>> Create(int goalId, ProgressCreateUpdateDto newProgress);
        Task<Result<GoalDto>> Update(int id, ProgressCreateUpdateDto updatedProgress);
        Task<Result<GoalDto>> Delete(int id); 
    }
}