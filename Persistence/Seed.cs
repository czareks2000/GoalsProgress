using Domain;
using Domain.Enums;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Goals.Any()) return;
            

            var categories = new List<Category>
            {
                new Category
                {
                    Id = 1,
                    Name = "Spacer",
                    Multiplier = 1.0M
                },
                new Category
                {
                    Id = 2,
                    Name = "Bieganie",
                    Multiplier = 1.5M
                },
                new Category
                {
                    Id = 3,
                    Name = "Rower",
                    Multiplier = 0.5M
                }
            };

            await context.Categories.AddRangeAsync(categories);

            var goals = new List<Goal>
            {
                new Goal
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
                    Type = GoalType.Standard,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 1,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)), 
                            Value = 1,
                            Description = "Batman"
                        },
                        new Progress
                        {
                            Id = 2,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 1,
                            Description = "Forest Gump"
                        },
                        new Progress
                        {
                            Id = 3,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 1,
                            Description = "Shrek"
                        },
                        new Progress
                        {
                            Id = 4,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-2)), 
                            Value = 1,
                            Description = "American Psycho"
                        }
                    }
                },
                new Goal
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
                    Type = GoalType.Standard,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 5,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)), 
                            Value = 1,
                            Description = "Makaron 1"
                        },
                        new Progress
                        {
                            Id = 6,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 1,
                            Description = "Makaron 2"
                        },
                        new Progress
                        {
                            Id = 7,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 1,
                            Description = "Makaron 3"
                        },
                        new Progress
                        {
                            Id = 8,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-2)), 
                            Value = 1,
                            Description = "Makaron 4"
                        },
                        new Progress
                        {
                            Id = 9,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-1)), 
                            Value = 1,
                            Description = "Makaron 5"
                        }
                    }
                },
                new Goal
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
                    Type = GoalType.Standard,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 10,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)), 
                            Value = 1,
                            Description = "Książka 1"
                        },
                        new Progress
                        {
                            Id = 11,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 1,
                            Description = "Książka 2"
                        },
                        new Progress
                        {
                            Id = 12,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 1,
                            Description = "Książka 3"
                        }
                    }
                },
                new Goal
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
                    Type = GoalType.Standard,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 13,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-50)), 
                            Value = 1,
                            Description = "W normie"
                        }
                    }
                },
                new Goal
                {
                    Id = 5,
                    Name = "Aktywność fizyczna",
                    Description = "Zdobyć 1000 punktów",
                    CustomUnit = true,
                    Unit = "pkt",
                    Deadline = DateOnly.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    CurrentValue = 548.77M,
                    TargetValue = 1000.0M,
                    Type = GoalType.Extended,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 14,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-5)),
                            Value = 200.0M,
                            Category = categories[0]
                        },
                        new Progress
                        {
                            Id = 15,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-4)), 
                            Value = 230.5M,
                            Category = categories[1]
                        },
                        new Progress
                        {
                            Id = 16,
                            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(-3)), 
                            Value = 6.04M,
                            Category = categories[2]
                        }
                    }
                }
            };

            
            
            await context.Goals.AddRangeAsync(goals);
            await context.SaveChangesAsync();
        }
    }
}