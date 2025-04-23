using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Mvc;//conatins classes and features for building webapplication like apicontroller
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;//IdentityDbconetxt is a build in class that connects our db+IdentitySystem
using Microsoft.EntityFrameworkCore;
namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>//provides identity related tables
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}
        
         public DbSet<User> Users { get; set; }
         public DbSet<Book> Books { get; set; }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);



    modelBuilder.Entity<ApplicationUser>()
        .HasIndex(u => u.Email)//for faster loading like recordes for easy identifivcation
        .IsUnique();
}
    }                                                                                                               

}
