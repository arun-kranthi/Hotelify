using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SmartHotelBookingSystem.Data;
using SmartHotelBookingSystem.Repository;
using SmartHotelBookingSystem.Services;
using SmartHotelBookingSystem.Services.Authentication;
using AutoMapper;
using System.Text;
using SmartHotelBookingSystem.Repository.module2_Repos;
using SmartHotelBookingSystem.Services.Module2_services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.`

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//add swagger
//builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>
{
    //definition of the swagger document
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartHotelBookingSystem", Version="v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name="Authorization",
        Type=SecuritySchemeType.Http,
        Scheme="Bearer",
        BearerFormat="JWT",
        In=ParameterLocation.Header,
        Description="Enter Token"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { 
            new OpenApiSecurityScheme
            {
                Reference=new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[] {}
        }
        

    });
}
    );
//creates new instace for every request
builder.Services.AddDbContext<BookingDBContext>(options=>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<PasswordHashing>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();

builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<IRoomService, RoomService>();

builder.Services.AddScoped<ILoyaltyRepository, LoyaltyRepository>();
builder.Services.AddScoped<IloyaltyServices, LoyaltyServices>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IReviewService, ReviewService>();

builder.Services.AddAutoMapper(typeof(Program));
//Adding Authentication
builder.Services.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme
    ).AddJwtBearer("Bearer",
        option =>
        {
            option.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]))
            };
       }
    );
builder.Services.AddAuthorization();
//Enabling CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
//app.MapGet("/", () => "SmartHotelBookingSystem is running!");

app.Run();
