using System.ComponentModel.DataAnnotations;

namespace Application.Dto
{
    public class ProgressCreateDto
    {
        [Required]
        public Decimal Value { get; set; }
        public string Description { get; set; }
        [Required]
        public DateOnly Date { get; set; }
        [Required]
        public int GoalId { get; set; }
        public int CategoryId { get; set; }
    }
}