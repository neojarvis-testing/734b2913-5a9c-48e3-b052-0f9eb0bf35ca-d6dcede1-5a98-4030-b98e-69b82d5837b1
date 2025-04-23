using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace dotnetapp.Models
{
    public class UserRoles : IdentityRole//builsd in class provides role
    {
        public string  BookRecommender{get;set;}
        public string BookReader{get;set;}
    }
}
