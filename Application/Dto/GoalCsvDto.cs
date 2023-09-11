using Domain.Enums;

namespace Application.Dto
{
    public class GoalCsvDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal CurrentValue { get; set; }
        public decimal TargetValue { get; set; }
        public bool CustomUnit { get; set; }
        public string Unit { get; set; }
        public DateTime Deadline { get; set; }
        public GoalStatus Status { get; set; }
        public GoalType Type { get; set; }
        public DateTime ModificationDate { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}