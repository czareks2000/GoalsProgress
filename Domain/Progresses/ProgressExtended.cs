using Domain.Goals;

namespace Domain.Progresses
{
    public class ProgressExtended : Progress
    {
        public Decimal Value { get; set; }
        public Category Category { get; set; }
        public GoalExtended GoalExtended { get; set; }
    }
}