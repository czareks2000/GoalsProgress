using System.ComponentModel.DataAnnotations;
using Application.Core.CustomDataAnnotations;
using Domain.Enums;

namespace Application.Dto
{
    public class GoalCreateUpdateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [GraterThanZero(ErrorMessage = "Field {0} must be positive number")]
        public decimal TargetValue { get; set; }
        public bool CustomUnit { get; set; }
        public string Unit { get; set; }
        [Required]
        public DateTime Deadline { get; set; }
        [Required]
        public GoalType Type { get; set; }
    }
}