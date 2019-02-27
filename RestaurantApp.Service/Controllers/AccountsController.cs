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

        public AccountsController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registration)
        {
            var user = new ApplicationUser { FirstName = registration.FirstName, LastName = registration.LastName, UserName = registration.Email, Email = registration.Email };
            var result = await userManager.CreateAsync(user, registration.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

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
            var applicationUser = await context.ApplicationUsers.FindAsync(user.Id);

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, applicationUser.Id),
                new Claim(JwtRegisteredClaimNames.GivenName, applicationUser.FirstName + " " + applicationUser.LastName),
                new Claim(JwtRegisteredClaimNames.Email, applicationUser.Email)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is a scret phrase."));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);

            return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
        }
    }
}