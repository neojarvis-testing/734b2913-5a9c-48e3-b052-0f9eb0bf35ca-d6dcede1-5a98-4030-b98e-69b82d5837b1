
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return (400, "User already exists");
            }
            model.UserRole = role;
            _context.Users.Add(model);
            await _context.SaveChangesAsync();

            return (201, "User registered successfully");
        }

        public async Task<(int, object)> Login(LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
            {
                return (400, "Invalid email");
            }
            if (user.Password != model.Password)
            {
                return (400, "Invalid password");
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.UserRole)
            };

            var token = GenerateToken(claims);
            return (200, new { Token = token });
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JWT");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
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