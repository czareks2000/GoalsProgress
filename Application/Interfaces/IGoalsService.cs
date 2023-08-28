using Application.Core;
using Application.Dto;
using Domain;
using Domain.Enums;

namespace Application.Interfaces
{
    public interface IGoalsService
    {
        Task<Result<List<GoalDto>>> GetAll();
        Task<Result<GoalDto>> GetOne(int id);
        Task<Result<int>> Create(GoalCreateUpdateDto newGoal); 
        Task<Result<Object>> Update(int id, GoalCreateUpdateDto updatedGoal);
        Task<Result<Object>> UpdateStatus(int id, GoalStatus newStatus); 
        Task<Result<Object>> Delete(int id); 
    }
}