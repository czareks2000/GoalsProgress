namespace Application.Dto
{
    public class ExtendedGoalDto : GoalDto
    {
        public ICollection<ExtendedProgressDto> Progresses { get; set; }
    }
}