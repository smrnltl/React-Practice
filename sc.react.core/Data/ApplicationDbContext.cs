using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace sc.react.core.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<IdentityUser>().ToTable("AspNetUsers").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("AspNetUserLogins");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("AspNetUserClaims");
            modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles");
        }
    }
}
