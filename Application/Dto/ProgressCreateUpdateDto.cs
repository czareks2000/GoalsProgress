using System.ComponentModel.DataAnnotations;
using Application.Core.CustomDataAnnotations;

namespace Application.Dto
{
    public class ProgressCreateUpdateDto
    {
        [Required]
        [GraterThanZero(ErrorMessage = "Field {0} must be positive number")]
        public Decimal Value { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}