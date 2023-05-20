using Domain.Progresses;

namespace Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Decimal Multiplier { get; set; }
        public ExtendedProgress ExtendedProgress { get; set; }
    }
}