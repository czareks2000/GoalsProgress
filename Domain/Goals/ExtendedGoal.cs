namespace Domain
{
    public class ExtendedGoal : Goal
    {
        public ICollection<ExtendedProgress> Progresses { get; set; }
    }
}