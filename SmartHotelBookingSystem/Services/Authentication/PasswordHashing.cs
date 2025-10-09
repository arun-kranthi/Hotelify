using Microsoft.AspNetCore.Identity;

namespace SmartHotelBookingSystem.Services.Authentication
{
    public class PasswordHashing
    {
        private readonly PasswordHasher<string> _hasher = new PasswordHasher<string>();
        public string HashPassword(string plainPassword)
        {
            return _hasher.HashPassword(null, plainPassword);
        }
        public bool VerifyPassword(string hashedPassword,string plainPassword)
        {
            var result = _hasher.VerifyHashedPassword(null, hashedPassword,plainPassword);
            return result == PasswordVerificationResult.Success;

        }
    }
}
