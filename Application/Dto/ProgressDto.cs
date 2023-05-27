namespace Application.Dto
{
    public class ProgressDto
    {
        public int Id { get; set; }
        public Decimal Value { get; set; }
        public string Description { get; set; }
        public DateOnly Date { get; set; }
        public CategoryDto Category { get; set; }
    }
}