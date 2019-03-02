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

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            return Ok(order);
        }

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
                return NotFound();

            var table = await _context.Tables.FindAsync(order.TableID);

            table.IsAvailable = true;

            _context.Orders.Remove(order);

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

        [HttpGet("{id}/ready")]
        public bool IsOderReady(int id)
        {
            var readyProducts = _context.OrderProducts.Where(o => o.OrderID == id).Where(o => o.IsDone == true).Count();
            var products = _context.OrderProducts.Where(o => o.OrderID == id).Count();

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
