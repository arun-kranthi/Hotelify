using Microsoft.IdentityModel.Tokens;
using SmartHotelBookingSystem.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartHotelBookingSystem.Services.Authentication
{
    public class JwtTokenGenerator: IJwtTokenGenerator
    {
        private readonly IConfiguration _config;
        public JwtTokenGenerator(IConfiguration config)
        {
            _config= config;
        }

       //take user obj and return jwt string
        public string GenerateToken(User user)
        {
            //claims - pieces of info abt user
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.UserID.ToString()),
                new Claim(JwtRegisteredClaimNames.Email,user.Email),
                new Claim(ClaimTypes.Role,user.Role.ToString()),
                new Claim("Name",user.Name)
            };
            //generate key Reads the secret key from configuration (appsettings.json)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]));
            //creating signing credentials by using the key and algorithm
            var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            //create token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims : claims,
                expires: DateTime.Now.AddHours(Convert.ToDouble(_config["Jwt:ExpiryInHours"])),
                signingCredentials: creds
                );
            //return token as string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
