using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.Text;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Identity;
using dotnetapp.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


//Configuring entity framework core for Sql Server
builder.Services.AddDbContext<ApplicationDbContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("connstring")));

//Services Dependency
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<BookService>();

//Configuring Identity
builder.Services.AddIdenttiy<ApplicationUser, IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

//Configuring JWT Authentication
var jwtSetting = builder.Configuration.GetSection("JWT");
var secretKey = Encoding.UTF8.getBytes(jwtSettings["Secret"]);

builder.Services.AffAuthentication(options=>{
    options.DefaultAuthenticationScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options=>{
    options.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidateIssuer = jwtSettings["ValidIssuer"],
        IssuerSigningKey = new SymmetricSecuritykey(sercetKey)

    };
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Adding Authorization
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();
app.MapControllers();

app.Run();
