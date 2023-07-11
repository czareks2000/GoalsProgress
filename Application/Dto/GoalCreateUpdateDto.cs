using System.ComponentModel.DataAnnotations;
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
        public decimal TargetValue { get; set; }
        public bool CustomUnit { get; set; }
        public string Unit { get; set; }
        [Required]
        public DateOnly Deadline { get; set; }
        [Required]
        public GoalType Type { get; set; }
    }
}