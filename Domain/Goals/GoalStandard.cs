using Domain.Progresses;

namespace Domain.Goals
{
    public class GoalStandard : Goal
    {
        public int CurrentValue { get; set; }
        public int TargetValue { get; set; }
        public ICollection<ProgressStandard> Progresses { get; set; }
    }
}