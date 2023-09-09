using System.ComponentModel.DataAnnotations;
using Application.Core.CustomDataAnnotations;

namespace Application.Dto
{
    public class CategoryCreateUpdateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [GraterThanZero(ErrorMessage = "Field {0} must be positive number")]
        public decimal Multiplier { get; set; }
    }
}