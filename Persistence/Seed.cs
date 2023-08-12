using Domain;
using Domain.Enums;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Goals.Any()) return;

            var goals = new List<Goal>
            {
                new Goal
                {
                    Id = 1,
                    Name = "Filmy",
                    Description = "Obejrzeć 20 filmów",
                    CustomUnit = false,
                    Unit = "",
                    Deadline = DateTime.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    CurrentValue = 4,
                    TargetValue = 20,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.Now,
                    CompletedDate = null,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 1,
                            Date = DateTime.Now.AddDays(-5), 
                            Value = 1,
                            Description = "Batman"
                        },
                        new Progress
                        {
                            Id = 2,
                            Date = DateTime.Now.AddDays(-4), 
                            Value = 1,
                            Description = "Forest Gump"
                        },
                        new Progress
                        {
                            Id = 3,
                            Date = DateTime.Now.AddDays(-3), 
                            Value = 1,
                            Description = "Shrek"
                        },
                        new Progress
                        {
                            Id = 4,
                            Date = DateTime.Now.AddDays(-2), 
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
                    Unit = "",
                    Deadline = DateTime.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    CurrentValue = 5,
                    TargetValue = 10,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.Now,
                    CompletedDate = null,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 5,
                            Date = DateTime.Now.AddDays(-5), 
                            Value = 1,
                            Description = "Makaron 1"
                        },
                        new Progress
                        {
                            Id = 6,
                            Date = DateTime.Now.AddDays(-4), 
                            Value = 1,
                            Description = "Makaron 2"
                        },
                        new Progress
                        {
                            Id = 7,
                            Date = DateTime.Now.AddDays(-3), 
                            Value = 1,
                            Description = "Makaron 3"
                        },
                        new Progress
                        {
                            Id = 8,
                            Date = DateTime.Now.AddDays(-2), 
                            Value = 1,
                            Description = "Makaron 4"
                        },
                        new Progress
                        {
                            Id = 9,
                            Date = DateTime.Now.AddDays(-1), 
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
                    Unit = "",
                    Deadline = DateTime.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    CurrentValue = 3,
                    TargetValue = 10,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.Now,
                    CompletedDate = null,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 10,
                            Date = DateTime.Now.AddDays(-5), 
                            Value = 1,
                            Description = "Książka 1"
                        },
                        new Progress
                        {
                            Id = 11,
                            Date = DateTime.Now.AddDays(-4), 
                            Value = 1,
                            Description = "Książka 2"
                        },
                        new Progress
                        {
                            Id = 12,
                            Date = DateTime.Now.AddDays(-3), 
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
                    Deadline = DateTime.Parse("2023-12-31"),
                    Status = GoalStatus.Archvied,
                    CurrentValue = 1,
                    TargetValue = 2,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.Now,
                    CompletedDate = null,
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Id = 13,
                            Date = DateTime.Now.AddDays(-50), 
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
                    Deadline = DateTime.Parse("2023-12-31"),
                    Status = GoalStatus.Current,
                    CurrentValue = 548.77M,
                    TargetValue = 1000.0M,
                    Type = GoalType.Extended,
                    ModificationDate = DateTime.Now,
                    CompletedDate = null,
                    Categories = new List<Category>
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
                    }
                }
            };

            goals[4].Progresses = new List<Progress>
            {
                new Progress
                {
                    Id = 14,
                    Date = DateTime.Now.AddDays(-5),
                    Value = 200.0M,
                    Category = goals[4].Categories.FirstOrDefault(c => c.Name == "Spacer")
                },
                new Progress
                {
                    Id = 15,
                    Date = DateTime.Now.AddDays(-4), 
                    Value = 230.5M,
                    Category = goals[4].Categories.FirstOrDefault(c => c.Name == "Bieganie")
                },
                new Progress
                {
                    Id = 16,
                    Date = DateTime.Now.AddDays(-3), 
                    Value = 6.04M,
                    Category = goals[4].Categories.FirstOrDefault(c => c.Name == "Rower")
                }
            };
            
            await context.Goals.AddRangeAsync(goals);
            await context.SaveChangesAsync();
        }
    }
}