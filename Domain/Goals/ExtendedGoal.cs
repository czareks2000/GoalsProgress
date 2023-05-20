using Domain.Progresses;

namespace Domain.Goals
{
    public class ExtendedGoal : Goal
    {
        public ICollection<ExtendedProgress> Progresses { get; set; }
    }
}