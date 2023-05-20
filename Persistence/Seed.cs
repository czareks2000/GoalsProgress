using Domain.Enums;
using Domain.Goals;
using Domain.Progresses;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.StandardGoals.Any()) return;
            
            var standardGoals = new List<StandardGoal>
            {
                new StandardGoal
                {
                    Id = 1,
                    Name = "Filmy",
                    Description = "Obejrzeć 20 filmów",
                    CustomUnit = false,
                    Unit = "none",
                    Deadline = DateOnly.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    Type = GoalType.Standard,
                    CurrentValue = 4,
                    TargetValue = 20,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 1,
                            Date = DateTime.Now.AddDays(-5), 
                            Value = 1,
                            Description = "Batman"
                        },
                        new StandardProgress
                        {
                            Id = 2,
                            Date = DateTime.Now.AddDays(-4), 
                            Value = 1,
                            Description = "Forest Gump"
                        },
                        new StandardProgress
                        {
                            Id = 3,
                            Date = DateTime.Now.AddDays(-3), 
                            Value = 1,
                            Description = "Shrek"
                        },
                        new StandardProgress
                        {
                            Id = 4,
                            Date = DateTime.Now.AddDays(-2), 
                            Value = 1,
                            Description = "American Psycho"
                        }
                    }
                },
                new StandardGoal
                {
                    Id = 2,
                    Name = "Przepisy",
                    Description = "Wypróbować 10 nowych przepisów",
                    CustomUnit = false,
                    Unit = "none",
                    Deadline = DateOnly.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    Type = GoalType.Standard,
                    CurrentValue = 5,
                    TargetValue = 10,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 5,
                            Date = DateTime.Now.AddDays(-5), 
                            Value = 1,
                            Description = "Makaron 1"
                        },
                        new StandardProgress
                        {
                            Id = 6,
                            Date = DateTime.Now.AddDays(-4), 
                            Value = 1,
                            Description = "Makaron 2"
                        },
                        new StandardProgress
                        {
                            Id = 7,
                            Date = DateTime.Now.AddDays(-3), 
                            Value = 1,
                            Description = "Makaron 3"
                        },
                        new StandardProgress
                        {
                            Id = 8,
                            Date = DateTime.Now.AddDays(-2), 
                            Value = 1,
                            Description = "Makaron 4"
                        },
                        new StandardProgress
                        {
                            Id = 9,
                            Date = DateTime.Now.AddDays(-1), 
                            Value = 1,
                            Description = "Makaron 5"
                        }
                    }
                },
                new StandardGoal
                {
                    Id = 3,
                    Name = "Książki",
                    Description = "Przeczytać 10 książek",
                    CustomUnit = false,
                    Unit = "none",
                    Deadline = DateOnly.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    Type = GoalType.Standard,
                    CurrentValue = 3,
                    TargetValue = 10,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 10,
                            Date = DateTime.Now.AddDays(-5), 
                            Value = 1,
                            Description = "Książka 1"
                        },
                        new StandardProgress
                        {
                            Id = 11,
                            Date = DateTime.Now.AddDays(-4), 
                            Value = 1,
                            Description = "Książka 2"
                        },
                        new StandardProgress
                        {
                            Id = 12,
                            Date = DateTime.Now.AddDays(-3), 
                            Value = 1,
                            Description = "Książka 3"
                        }
                    }
                },
                new StandardGoal
                {
                    Id = 4,
                    Name = "Badanie krwi",
                    Description = "Zrobić morfologie krwi 2 razy",
                    CustomUnit = true,
                    Unit = "szt",
                    Deadline = DateOnly.Parse("2023-12-31"),
                    Status = GoalStatus.Archvied,
                    Type = GoalType.Standard,
                    CurrentValue = 1,
                    TargetValue = 2,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 13,
                            Date = DateTime.Now.AddDays(-50), 
                            Value = 1,
                            Description = "W normie"
                        }
                    }
                }
            };

            await context.StandardGoals.AddRangeAsync(standardGoals);
            await context.SaveChangesAsync();
        }
    }
}