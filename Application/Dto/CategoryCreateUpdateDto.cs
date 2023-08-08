using System.ComponentModel.DataAnnotations;

namespace Application.Dto
{
    public class CategoryCreateUpdateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public Decimal Multiplier { get; set; }
    }
}