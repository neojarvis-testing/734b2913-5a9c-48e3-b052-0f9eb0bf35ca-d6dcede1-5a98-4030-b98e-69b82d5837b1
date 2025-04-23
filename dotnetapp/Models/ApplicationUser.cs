using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;//provides a framework
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class ApplicationUser : IdentityUser//it is defined that appn user will be the identity user=>connects role and user.
{
    [Required]
    [MaxLength(30)]
    public string Name { get; set; }
}