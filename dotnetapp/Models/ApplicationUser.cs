using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ApplicationUser:IdentityUser
    {
        [Required]
        [StringLength(30, ErrorMessage= "Name cannot exceed 30 characters.")]
        public string Name {get;set;}
    }
}