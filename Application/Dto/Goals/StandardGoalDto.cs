namespace Application.Dto
{
    public class StandardGoalDto : GoalDto
    {
        public ICollection<StandardProgressDto> Progresses { get; set; }
    }
}