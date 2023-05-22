namespace Domain
{
    public class StandardGoal : Goal
    {
        public ICollection<StandardProgress> Progresses { get; set; }
    }
}