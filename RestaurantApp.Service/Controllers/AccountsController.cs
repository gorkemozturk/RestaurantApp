using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestaurantApp.Service.Data;
using RestaurantApp.Service.Model;
using RestaurantApp.Service.Model.ViewModels;

namespace RestaurantApp.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public AccountsController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registration)
        {
            if (!await roleManager.RoleExistsAsync("Officer")) await roleManager.CreateAsync(new IdentityRole("Officer"));
            if (!await roleManager.RoleExistsAsync("User")) await roleManager.CreateAsync(new IdentityRole("User"));

            var user = new ApplicationUser { FirstName = registration.FirstName, LastName = registration.LastName, UserName = registration.Email, Email = registration.Email };
            var users = await context.ApplicationUsers.CountAsync();
            var result = await userManager.CreateAsync(user, registration.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);
            else
            {
                if (users == 0)
                    await userManager.AddToRoleAsync(user, "Officer");
                else
                    await userManager.AddToRoleAsync(user, "User");
            }

            await signInManager.SignInAsync(user, isPersistent: false);

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel login)
        {
            var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, false, false);

            if (!result.Succeeded)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(login.Email);
            var roles = await userManager.GetRolesAsync(user);
            var applicationUser = await context.ApplicationUsers.FindAsync(user.Id);

            string userRole = null;
            foreach (var role in roles)
                userRole = role;

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, applicationUser.Id),
                new Claim(JwtRegisteredClaimNames.GivenName, applicationUser.FirstName + " " + applicationUser.LastName),
                new Claim(JwtRegisteredClaimNames.Email, applicationUser.Email),
                new Claim(JwtRegisteredClaimNames.Typ, userRole)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is a scret phrase."));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);

            return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
        }
    }
}