using System.ComponentModel.DataAnnotations;

namespace Application.Dto
{
    public class ProgressCreateUpdateDto
    {
        [Required]
        public Decimal Value { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}