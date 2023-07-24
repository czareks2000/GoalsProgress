using System.Text.Json.Serialization;
using API.Middleware;
using Application.Interfaces;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Interfaces;
using Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
        .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", policy => {
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddScoped<IGoalsService, GoalsService>();
builder.Services.AddScoped<IGoalsRepository, GoalsRepository>();

builder.Services.AddScoped<IProgressesService, ProgressesService>();
builder.Services.AddScoped<IProgressesRepository, ProgressesRepository>();

builder.Services.AddScoped<ICategoriesService, CategoriesService>();
builder.Services.AddScoped<ICategoriesRepository, CategoriesRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope()) 
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await Seed.SeedData(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured during migration");
    }
}

app.Run();
