using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) 
            :base(options){}

        public DbSet<Goal> Goals { get; set; }
        public DbSet<Progress> Progresses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Goals)
                .WithOne(g => g.User)
                .HasForeignKey("UserId")
                .IsRequired();

            modelBuilder.Entity<Goal>()
                .HasMany(e => e.Progresses)
                .WithOne(e => e.Goal)
                .HasForeignKey("GoalId")
                .IsRequired();

            modelBuilder.Entity<Goal>()
                .HasMany(e => e.Categories)
                .WithOne(e => e.Goal)
                .HasForeignKey("GoalId")
                .IsRequired();

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Progresses)
                .WithOne(e => e.Category)
                .HasForeignKey("CategoryId")
                .IsRequired(false);
        }

    }
}