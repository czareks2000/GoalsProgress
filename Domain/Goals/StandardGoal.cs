using Domain.Progresses;

namespace Domain.Goals
{
    public class StandardGoal : Goal
    {
        public int CurrentValue { get; set; }
        public int TargetValue { get; set; }
        public ICollection<StandardProgress> Progresses { get; set; }
    }
}