using Domain.Enums;

namespace Domain.Goals
{
    public abstract class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool CustomUnit { get; set; }
        public string Unit { get; set; }
        public DateOnly Deadline { get; set; }
        public GoalStatus Status { get; set; }
    }
}