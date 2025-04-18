using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class ApplicationUser : IdentityUser
{
    [Required]
    [MaxLength(30)]
    public string Name { get; set; }
}