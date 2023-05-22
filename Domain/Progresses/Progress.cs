namespace Domain
{
    public abstract class Progress
    {
        public int Id { get; set; }
        public Decimal Value { get; set; }
        public DateOnly Date { get; set; }
    }
}