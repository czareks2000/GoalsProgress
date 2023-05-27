namespace Domain
{
    public class Progress
    {
        public int Id { get; set; }
        public Decimal Value { get; set; }
        public string Description { get; set; }
        public DateOnly Date { get; set; }
        public Goal Goal { get; set; }
        public Category Category { get; set; }
    }
}