using Microsoft.EntityFrameworkCore;
using SmartHotelBookingSystem.DTO;
using SmartHotelBookingSystem.Enums;
using SmartHotelBookingSystem.Model;
using SmartHotelBookingSystem.Repository;
using SmartHotelBookingSystem.Services.Authentication;

namespace SmartHotelBookingSystem.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _repo;
        private readonly IJwtTokenGenerator _tokenGen;
        private readonly PasswordHashing _passwordHashing;
        private readonly ILoyaltyRepository _loyaltyRepository;
        public UserService(IUserRepository repo, ILoyaltyRepository loyaltyRepo, IJwtTokenGenerator tokenGen,PasswordHashing passwordHashing)
        {
            _repo = repo;
            _tokenGen = tokenGen;
            _passwordHashing = passwordHashing;
            _loyaltyRepository = loyaltyRepo;
        }
        
        public async Task<string> AuthenticateAsync(UserLoginDto loginDto)
        {
            var user = await _repo.GetUserByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return null;
            }
            bool isPasswordValid = _passwordHashing.VerifyPassword(user.Password, loginDto.Password);
            if(!isPasswordValid)
            {
                return null;
            }
            //generate token
            return _tokenGen.GenerateToken(user);
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users=await _repo.GetAllUsersAsync();
            return users.Select(u =>
            new UserResponseDto
            {
                UserID = u.UserID,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role.ToString(),
                ContactNumber = u.ContactNumber,
            });
        }

        public async Task<UserResponseDto> RegisterAsync(UserCreateDto createDto)
        {
            string hashedPassword = _passwordHashing.HashPassword(createDto.Password);
            var user = new User
            {
                Name=createDto.Name,
                Email=createDto.Email,
                Password=hashedPassword,
                Role = Enum.Parse<UserRole>(createDto.Role,ignoreCase:true),
                ContactNumber=createDto.ContactNumber,
            };
            await _repo.AddUserAsync(user);
            await _loyaltyRepository.AddPointsAsync(user.UserID, 0);
            return new UserResponseDto
            {
                UserID=user.UserID,
                Name=user.Name,
                Email=user.Email,
                Role=user.Role.ToString(),
                ContactNumber=user.ContactNumber,
            };
            
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _repo.GetUserByIdAsync(id);
            if (user == null)
                return false;
            await _repo.DeleteUserAsync(id);
            return true;
        }

        public async Task<UserResponseDto> UpdateUserAsync(int id, UserUpdateDto updateDto)
        {
            var user= await _repo.GetUserByIdAsync(id);
            if (user == null)
                throw new Exception($"User with ID {id} not found.");

            user.Name = updateDto.Name;
            user.Email = updateDto.Email;
            user.ContactNumber = updateDto.ContactNumber;

            await _repo.UpdateUserAsync(user);
            return new UserResponseDto
            {
                UserID=user.UserID,
                Name=user.Name, 
                Email=user.Email,
                Role=user.Role.ToString(),
                ContactNumber = user.ContactNumber
            };
        }
    }
}
