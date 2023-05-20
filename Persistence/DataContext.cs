using Domain;
using Domain.Goals;
using Domain.Progresses;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) 
            :base(options){}

        public DbSet<StandardGoal> StandardGoals { get; set; }
        public DbSet<ExtendedGoal> ExtendedGoals { get; set; }
        public DbSet<StandardProgress> StandardProgresses { get; set; }
        public DbSet<ExtendedProgress> ExtendedProgresses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            base.OnModelCreating(modelBuilder);

            // Required one-to-many with shadow foreign key
            modelBuilder.Entity<StandardGoal>()
                .HasMany(e => e.Progresses)
                .WithOne(e => e.StandardGoal)
                .HasForeignKey("GoalId")
                .IsRequired();

            // Required one-to-many with shadow foreign key 
            modelBuilder.Entity<ExtendedGoal>()
                .HasMany(e => e.Progresses)
                .WithOne(e => e.ExtendedGoal)
                .HasForeignKey("GoalId")
                .IsRequired();

            // Required one-to-one with primary key to primary key relationship
            modelBuilder.Entity<ExtendedProgress>()
                .HasOne(e => e.Category)
                .WithOne(e => e.ExtendedProgress)
                .HasForeignKey<Category>();
        }

    }
}