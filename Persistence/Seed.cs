using Domain;
using Domain.Enums;

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
                    CurrentValue = 4,
                    TargetValue = 20,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 1,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)), 
                            Value = 1,
                            Description = "Batman"
                        },
                        new StandardProgress
                        {
                            Id = 2,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 1,
                            Description = "Forest Gump"
                        },
                        new StandardProgress
                        {
                            Id = 3,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 1,
                            Description = "Shrek"
                        },
                        new StandardProgress
                        {
                            Id = 4,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-2)), 
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
                    CurrentValue = 5,
                    TargetValue = 10,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 5,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)), 
                            Value = 1,
                            Description = "Makaron 1"
                        },
                        new StandardProgress
                        {
                            Id = 6,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 1,
                            Description = "Makaron 2"
                        },
                        new StandardProgress
                        {
                            Id = 7,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 1,
                            Description = "Makaron 3"
                        },
                        new StandardProgress
                        {
                            Id = 8,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-2)), 
                            Value = 1,
                            Description = "Makaron 4"
                        },
                        new StandardProgress
                        {
                            Id = 9,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-1)), 
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
                    CurrentValue = 3,
                    TargetValue = 10,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 10,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)), 
                            Value = 1,
                            Description = "Książka 1"
                        },
                        new StandardProgress
                        {
                            Id = 11,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 1,
                            Description = "Książka 2"
                        },
                        new StandardProgress
                        {
                            Id = 12,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
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
                    CurrentValue = 1,
                    TargetValue = 2,
                    Progresses = new List<StandardProgress>
                    {
                        new StandardProgress
                        {
                            Id = 13,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-50)), 
                            Value = 1,
                            Description = "W normie"
                        }
                    }
                }
            };
            
            var extendedGoals = new List<ExtendedGoal>
            {
                new ExtendedGoal
                {
                    Id = 1,
                    Name = "Aktywność fizyczna",
                    Description = "Zdobyć 1000 punktów",
                    CustomUnit = true,
                    Unit = "pkt",
                    Deadline = DateOnly.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    CurrentValue = 548.77M,
                    TargetValue = 1000.0M,
                    Progresses = new List<ExtendedProgress>
                    {
                        new ExtendedProgress
                        {
                            Id = 1,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)),
                            Value = 200.0M,
                            Category = new Category
                            {
                                Id = 1,
                                Name = "Spacer",
                                Multiplier = 1.0M
                            }
                        },
                        new ExtendedProgress
                        {
                            Id = 2,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 230.5M,
                            Category = new Category
                            {
                                Id = 2,
                                Name = "Bieganie",
                                Multiplier = 1.5M
                            }
                        },
                        new ExtendedProgress
                        {
                            Id = 3,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 6.04M,
                            Category = new Category
                            {
                                Id = 3,
                                Name = "Rower",
                                Multiplier = 0.5M
                            }
                        }
                    }
                }
            };

            await context.StandardGoals.AddRangeAsync(standardGoals);
            await context.ExtendedGoals.AddRangeAsync(extendedGoals);
            await context.SaveChangesAsync();
        }
    }
}