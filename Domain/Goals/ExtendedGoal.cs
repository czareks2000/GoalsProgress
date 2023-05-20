using Domain.Progresses;

namespace Domain.Goals
{
    public class ExtendedGoal : Goal
    {
        public Decimal CurrentValue { get; set; }
        public Decimal TargetValue { get; set; }
        public ICollection<ExtendedProgress> Progresses { get; set; }
    }
}