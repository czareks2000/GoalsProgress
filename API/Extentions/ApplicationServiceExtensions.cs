using System.Text.Json.Serialization;
using Application.Interfaces;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Interfaces;
using Persistence.Repositories;

namespace API.Extentions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config)
        {
            services.AddControllers()
                .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                });
            });

            services.AddScoped<IGoalsService, GoalsService>();
            services.AddScoped<IGoalsRepository, GoalsRepository>();

            services.AddScoped<IProgressesService, ProgressesService>();
            services.AddScoped<IProgressesRepository, ProgressesRepository>();

            services.AddScoped<ICategoriesService, CategoriesService>();
            services.AddScoped<ICategoriesRepository, CategoriesRepository>();

            return services;
        }

    }
}