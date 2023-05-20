using Domain.Progresses;

namespace Domain.Goals
{
    public class StandardGoal : Goal
    {
        public ICollection<StandardProgress> Progresses { get; set; }
    }
}