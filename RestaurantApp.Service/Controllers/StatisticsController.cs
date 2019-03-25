using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApp.Service.Data;

namespace RestaurantApp.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StatisticsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatisticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("daily-gains")]
        public async Task<IActionResult> GetDailyGains()
        {
            var payments = await _context.Payments.Where(p => p.CreatedAt.Date == DateTime.Today.Date).ToListAsync();

            double total = 0;
            foreach (var payment in payments)
                total += payment.Total;

            return Ok(total);
        }

        [HttpGet("weekly-gains")]
        public async Task<IActionResult> GetWeeklyGains()
        {
            var payments = await _context.Payments.Where(p => p.CreatedAt.Date <= DateTime.Today.Date.AddDays(7)).ToListAsync();

            double total = 0;
            foreach (var payment in payments)
                total += payment.Total;

            return Ok(total);
        }

        [HttpGet("monthly-gains")]
        public async Task<IActionResult> GetMonthlyGains()
        {
            int days = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);

            var payments = await _context.Payments.Where(p => p.CreatedAt.Date <= DateTime.Today.Date.AddDays(days)).ToListAsync();

            double total = 0;
            foreach (var payment in payments)
                total += payment.Total;

            return Ok(total);
        }
    }
}