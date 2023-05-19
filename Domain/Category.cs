using Domain.Progresses;

namespace Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Multiplier { get; set; }
        public ProgressExtended ProgressExtended { get; set; }
    }
}