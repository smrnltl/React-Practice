using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sc.react.core.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Authorization;
using sc.user;
using sc.module;
using sc.organization;

namespace sc.react.core
{
    public class Startup
    {
        public static string ConnectionString { get; set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            ConnectionString = Configuration.GetConnectionString("DefaultConnection");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            //services.AddDefaultIdentity<ApplicationUser>()
            //    .AddDefaultUI(UIFramework.Bootstrap4)
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddIdentity<ApplicationUser, IdentityRole>(
                options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredUniqueChars = 0;
                    options.Password.RequireNonAlphanumeric = false;
                }
                )
                .AddEntityFrameworkStores<ApplicationDbContext>();

            //services.Configure<IdentityOptions>(options =>
            //{
            //    options.Password.RequiredLength = 10;
            //});

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUserDbContext, UserDbContext>();
            services.AddScoped<IModuleDbContext, ModuleDbContext>();
            services.AddScoped<IOrganizationDbContext, OrganizationDbContext>();

            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults:new {controller = "Admin", action = "Index" }
                    );
                routes.MapRoute(
                  name: "areas",
                  template: "{area}/{controller=Home}/{action=Index}/{id?}"
                );
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Admin}/{action=Index}/{id?}");                
            });
        }
    }
}
