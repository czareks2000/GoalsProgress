using Domain.Goals;

namespace Domain.Progresses
{
    public class ProgressStandard : Progress
    {
        public int Value { get; set; }
        public string Description { get; set; }
        public GoalStandard GoalStandard { get; set; }
    }
}