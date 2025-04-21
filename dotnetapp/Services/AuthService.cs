
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using dotnetapp.Data;
 
namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService( UserManager<ApplicationUser> userManager,RoleManager<IdentityRole> roleManager,
                            IConfiguration configuration,ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }
public async Task<(int, string)> Registration(User model, string role)
{
    try
    {
        var existingUser = await _userManager.FindByEmailAsync(model.Email);
        if (existingUser != null)
        {
            return (400, "User already exists");
        }

        var user = new ApplicationUser
        {
            UserName = model.Username,
            Email = model.Email,
            PhoneNumber = model.MobileNumber,
            Name = model.Username 
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
            return (400, "User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));
        }

        if (!await _roleManager.RoleExistsAsync(role))
        {
            return (400, "Role does not exist");
        }

        await _userManager.AddToRoleAsync(user, role);
        return (201, "User registered successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during registration: {ex.Message}");
        return (500, "An unexpected error occurred. Please try again later.");
    }
}
      public async Task<(int, object)> Login(LoginModel model)
{
    try
    {
        // Find the user by email
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return (0, "Invalid email or password");
        }

        // Validate the password
        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return (0, "Invalid email or password");
        }

        // Get user roles
        var roles = await _userManager.GetRolesAsync(user);

        // Generate JWT token
        var token = GenerateJwtToken(user, roles);

        return (1, new { Token = token });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error during login: {ex.Message}");
        return (0, "An unexpected error occurred. Please try again later.");
    }
}

private string GenerateJwtToken(ApplicationUser user, IList<string> roles)
{
    var jwtSettings = _configuration.GetSection("JWT");
    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
    var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Email, user.Email)
    };

    foreach (var role in roles)
    {
        claims.Add(new Claim(ClaimTypes.Role, role));
    }

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(8),
        Issuer = jwtSettings["ValidIssuer"],
        Audience = jwtSettings["ValidAudience"],
        SigningCredentials = credentials
    };

    var tokenHandler = new JwtSecurityTokenHandler();
    var token = tokenHandler.CreateToken(tokenDescriptor);

    return tokenHandler.WriteToken(token);
}
    }
}
