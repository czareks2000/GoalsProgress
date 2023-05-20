using Domain.Goals;

namespace Domain.Progresses
{
    public class ExtendedProgress : Progress
    {
        public Decimal Value { get; set; }
        public Category Category { get; set; }
        public ExtendedGoal ExtendedGoal { get; set; }
    }
}