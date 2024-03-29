using System.Text;
using API.Interfaces;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extentions
{
    public static class IdentityServiceExtentions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {   
            services.AddIdentityCore<AppUser>(opt => 
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>();
            
            var key = new SymmetricSecurityKey(
                Encoding.UTF8
                    .GetBytes(config["TokenKey"])
                );

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => 
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddAuthorization(opt => {
                opt.AddPolicy("IsOwner", policy =>
                {
                    policy.Requirements.Add(new IsOwnerRequirements());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsOwnerRequirementsHandler>();
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}