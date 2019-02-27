using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantApp.Service.Data;
using RestaurantApp.Service.Model;

namespace RestaurantApp.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TablesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TablesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Table>>> GetTables()
        {
            return await _context.Tables.ToListAsync();
        }

        // GET: api/Tables
        [HttpGet("avaliable")]
        public async Task<ActionResult<IEnumerable<Table>>> GetAvaliableTables()
        {
            return await _context.Tables.Where(t => t.IsAvailable == true).ToListAsync();
        }

        // GET: api/Tables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Table>> GetTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);

            if (table == null)
            {
                return NotFound();
            }

            return table;
        }

        // PUT: api/Tables/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTable(int id, Table table)
        {
            if (id != table.ID)
            {
                return BadRequest();
            }

            _context.Entry(table).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tables
        [HttpPost]
        public async Task<ActionResult<Table>> PostTable(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTable", new { id = table.ID }, table);
        }

        // DELETE: api/Tables/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Table>> DeleteTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
            {
                return NotFound();
            }

            _context.Tables.Remove(table);
            await _context.SaveChangesAsync();

            return table;
        }

        private bool TableExists(int id)
        {
            return _context.Tables.Any(e => e.ID == id);
        }
    }
}
