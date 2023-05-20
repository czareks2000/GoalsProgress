using Domain.Goals;

namespace Domain.Progresses
{
    public class StandardProgress : Progress
    {
        public int Value { get; set; }
        public string Description { get; set; }
        public StandardGoal StandardGoal { get; set; }
    }
}