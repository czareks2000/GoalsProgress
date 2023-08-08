namespace Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Decimal Multiplier { get; set; }
        public Goal Goal { get; set; }
        public List<Progress> Progresses { get; set; }
    }
}