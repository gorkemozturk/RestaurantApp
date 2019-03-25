using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApp.Service.Data;
using RestaurantApp.Service.Model;
using RestaurantApp.Service.Model.ViewModels;

namespace RestaurantApp.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public UsersController(ApplicationDbContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
            return await _context.ApplicationUsers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(string id)
        {
            var user = await _context.ApplicationUsers.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] RegisterViewModel registration)
        {
            if (!ModelState.IsValid)
                return BadRequest(registration);

            var user = new ApplicationUser { FirstName = registration.FirstName, LastName = registration.LastName, UserName = registration.Email, Email = registration.Email };
            var result = await _userManager.CreateAsync(user, registration.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);
            else
            {
                await _userManager.AddToRoleAsync(user, "User");
                await _signInManager.SignInAsync(user, isPersistent: false);
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] string id, [FromBody] UserUpdateViewModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }

            var user = await _context.ApplicationUsers.FindAsync(id);

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PhoneNumber = model.PhoneNumber;
            user.City = model.City;
            user.Province = model.Province;
            user.Address = model.Address;
            user.Salary = model.Salary;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }

        [HttpPut("{id}/lockout")]
        public async Task<ActionResult> LockoutUser([FromRoute] string id)
        {
            var user = await _context.ApplicationUsers.FindAsync(id);

            if (user == null)
                return NotFound();

            var result = await _userManager.SetLockoutEndDateAsync(user, DateTime.Now.AddYears(99));

            if (!result.Succeeded)
                return BadRequest();
            else
                return Ok(user);
        }

        [HttpPut("{id}/unlock")]
        public async Task<ActionResult> UnlockUser([FromRoute] string id)
        {
            var user = await _context.ApplicationUsers.FindAsync(id);

            if (user == null)
                return NotFound();

            var result = await _userManager.SetLockoutEndDateAsync(user, null);

            if (!result.Succeeded)
                return BadRequest();
            else
                return Ok(user);
        }

        [HttpPut("{id}/change-password")]
        public async Task<ActionResult> PutUserPassword([FromRoute] string id, [FromBody] UserPasswordUpdateViewModel model)
        {
            if (id != model.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(model);

            var user = await _context.ApplicationUsers.FindAsync(id);

            if (user == null)
                return NotFound();

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
                return BadRequest(model);
            else
                return Ok(user);
        }
    }
}