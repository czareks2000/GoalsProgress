using Domain.Progresses;

namespace Domain.Goals
{
    public class GoalExtended : Goal
    {
        public Decimal CurrentValue { get; set; }
        public Decimal TargetValue { get; set; }
        public ICollection<ProgressExtended> Progresses { get; set; }
    }
}