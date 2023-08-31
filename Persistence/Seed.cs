using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any() || context.Goals.Any()) return;

            var users = new List<AppUser>
            {
                new AppUser
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                },
                new AppUser
                {
                    UserName = "ben",
                    Email = "ben@test.com"
                },
                new AppUser
                {
                    UserName = "susan",
                    Email = "susan@test.com"
                }
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            var goals = new List<Goal>
            {
                new Goal
                {
                    Name = "Filmy",
                    Description = "Obejrzeć 20 filmów",
                    CustomUnit = false,
                    Unit = "",
                    Deadline = DateTime.Parse("2023-12-31T23:59:59+00:00").ToUniversalTime(),
                    Status = GoalStatus.Current,
                    CurrentValue = 4,
                    TargetValue = 20,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.UtcNow,
                    CompletedDate = null,
                    User = users[0],
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-5), 
                            Value = 1,
                            Description = "Batman"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-4), 
                            Value = 1,
                            Description = "Forest Gump"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-3), 
                            Value = 1,
                            Description = "Shrek"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-2), 
                            Value = 1,
                            Description = "American Psycho"
                        }
                    }
                },
                new Goal
                {
                    Name = "Przepisy",
                    Description = "Wypróbować 10 nowych przepisów",
                    CustomUnit = false,
                    Unit = "",
                    Deadline = DateTime.Parse("2023-12-31T23:59:59+00:00").ToUniversalTime(),
                    Status = GoalStatus.Current,
                    CurrentValue = 5,
                    TargetValue = 10,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.UtcNow,
                    CompletedDate = null,
                    User = users[0],
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-5), 
                            Value = 1,
                            Description = "Makaron 1"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-4), 
                            Value = 1,
                            Description = "Makaron 2"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-3), 
                            Value = 1,
                            Description = "Makaron 3"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-2), 
                            Value = 1,
                            Description = "Makaron 4"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-1), 
                            Value = 1,
                            Description = "Makaron 5"
                        }
                    }
                },
                new Goal
                {
                    Name = "Książki",
                    Description = "Przeczytać 10 książek",
                    CustomUnit = false,
                    Unit = "",
                    Deadline = DateTime.Parse("2023-12-31T23:59:59+00:00").ToUniversalTime(),
                    Status = GoalStatus.Current,
                    CurrentValue = 3,
                    TargetValue = 10,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.UtcNow,
                    CompletedDate = null,
                    User = users[0],
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {                           
                            Date = DateTime.UtcNow.AddDays(-5), 
                            Value = 1,
                            Description = "Książka 1"
                        },
                        new Progress
                        {                           
                            Date = DateTime.UtcNow.AddDays(-4), 
                            Value = 1,
                            Description = "Książka 2"
                        },
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-3), 
                            Value = 1,
                            Description = "Książka 3"
                        }
                    }
                },
                new Goal
                {
                    Name = "Badanie krwi",
                    Description = "Zrobić morfologie krwi 2 razy",
                    CustomUnit = true,
                    Unit = "szt",
                    Deadline = DateTime.Parse("2023-12-31T23:59:59+00:00").ToUniversalTime(),
                    Status = GoalStatus.Archvied,
                    CurrentValue = 1,
                    TargetValue = 2,
                    Type = GoalType.Standard,
                    ModificationDate = DateTime.UtcNow,
                    CompletedDate = null,
                    User = users[0],
                    Progresses = new List<Progress>
                    {
                        new Progress
                        {
                            Date = DateTime.UtcNow.AddDays(-50), 
                            Value = 1,
                            Description = "W normie"
                        }
                    }
                },
                new Goal
                {
                    Name = "Aktywność fizyczna",
                    Description = "Zdobyć 1000 punktów",
                    CustomUnit = true,
                    Unit = "pkt",
                    Deadline = DateTime.Parse("2023-12-31T23:59:59+00:00").ToUniversalTime(),
                    Status = GoalStatus.Current,
                    CurrentValue = 548.77M,
                    TargetValue = 1000.0M,
                    Type = GoalType.Extended,
                    ModificationDate = DateTime.UtcNow,
                    CompletedDate = null,
                    User = users[0],
                    Categories = new List<Category>
                    {
                        new Category
                        {
                            Name = "Spacer",
                            Multiplier = 1.0M
                        },
                        new Category
                        {
                            Name = "Bieganie",
                            Multiplier = 1.5M
                        },
                        new Category
                        {
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
                    Date = DateTime.UtcNow.AddDays(-5),
                    Value = 200.0M,
                    Category = goals[4].Categories.FirstOrDefault(c => c.Name == "Spacer")
                },
                new Progress
                {
                    Date = DateTime.UtcNow.AddDays(-4), 
                    Value = 230.5M,
                    Category = goals[4].Categories.FirstOrDefault(c => c.Name == "Bieganie")
                },
                new Progress
                {
                    Date = DateTime.UtcNow.AddDays(-3), 
                    Value = 6.04M,
                    Category = goals[4].Categories.FirstOrDefault(c => c.Name == "Rower")
                }
            };
            
            await context.Goals.AddRangeAsync(goals);
            await context.SaveChangesAsync();
        }
    }
}