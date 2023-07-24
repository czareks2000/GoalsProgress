using Domain.Enums;

namespace Domain
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Decimal CurrentValue { get; set; }
        public Decimal TargetValue { get; set; }
        public bool CustomUnit { get; set; }
        public string Unit { get; set; }
        public DateTime Deadline { get; set; }
        public GoalStatus Status { get; set; }
        public GoalType Type { get; set; }
        public ICollection<Progress> Progresses { get; set; }
    }
}