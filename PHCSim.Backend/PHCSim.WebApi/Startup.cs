using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using PHCSim.Data.Repositories;
using PHCSim.Domain.AppServices;
using PHCSim.Domain.AppServices.Interfaces;
using PHCSim.Domain.Repositories;
using PHCSim.Domain.Services;
using PHCSim.Domain.Services.Interfaces;

namespace PHCSim.WebApi
{
    static class DependenciesExtension
    {
        public static void AddAppServices(this IServiceCollection services)
        {
            services.AddSingleton<ICircuitAppService, CircuitAppService>();
        }

        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<ICircuitService, CircuitService>();
        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddSingleton<ICircuitRepository, CircuitRepository>();
        }
    }

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PHCSim.WebApi", Version = "v1" });
            });

            services.AddAppServices();
            services.AddServices();
            services.AddRepositories();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000");
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PHCSim.WebApi v1"));
            }

            app.UseCors();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
