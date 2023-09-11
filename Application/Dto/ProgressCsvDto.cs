namespace Application.Dto
{
    public class ProgressCsvDto
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int GoalId { get; set; }
        public int? CategoryId { get; set; }
    }
}