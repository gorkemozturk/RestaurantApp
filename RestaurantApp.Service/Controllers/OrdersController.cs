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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(o => o.Table).Include(o => o.Waiter).OrderByDescending(o => o.CreatedAt).ToListAsync();
        }

        // GET: api/Orders/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Order>>> GetActiveOrders()
        {
            return await _context.Orders.Include(o => o.Table).Include(o => o.Waiter).OrderByDescending(o => o.CreatedAt).Where(o => o.IsPaid == false).ToListAsync();
        }

        // GET: api/Orders/5/total
        [HttpGet("{id}/total")]
        public async Task<IActionResult> GetOrderTotal([FromRoute] int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return BadRequest();

            var orders = await _context.OrderProducts.Where(o => o.OrderID == id).Include(o => o.Product).Select(o => new
            {
                price = o.Product.Price,
                tax = o.Product.Tax,
                quantity = o.Quantity
            }).ToListAsync();

            if (orders == null)
                return NotFound();

            double total = 0;
            foreach (var item in orders)
                total += (item.price + (item.price * item.tax / 100)) * item.quantity;

            order.Total = total;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(total);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.Table).FirstOrDefaultAsync(o => o.ID == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // GET: api/Orders/5
        [HttpGet("table/{id}")]
        public async Task<ActionResult<Order>> GetOrderByTable(int id)
        {
            var order = await _context.Orders.Where(o => o.TableID == id).Where(o => o.IsPaid == false).Include(o => o.Table).FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.ID)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var table = await _context.Tables.FindAsync(order.TableID);
            var claim = HttpContext.User.Claims.First().Value;

            order.UserID = claim;
            order.Total = 0;
            order.CreatedAt = DateTime.Now;
            table.IsAvailable = false;

            _context.Orders.Add(order);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            var table = await _context.Tables.FindAsync(order.TableID);

            table.IsAvailable = true;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        // PUT: api/Orders/5/status
        [HttpGet("{id}/status")]
        public async Task<bool> IsOderReady([FromRoute] int id)
        {
            var readyProducts = await _context.OrderProducts.Where(p => p.OrderID == id).Where(p => p.IsServed == true).CountAsync();
            var products = await _context.OrderProducts.Where(p => p.OrderID == id).CountAsync();

            if (readyProducts == products)
                return true;
            else
                return false;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.ID == id);
        }
    }
}
