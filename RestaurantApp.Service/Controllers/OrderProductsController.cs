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
    public class OrderProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("recent")]
        public async Task<ActionResult<IEnumerable<OrderProduct>>> GetRecentOrderProducts()
        {
            var orderProducts = await _context.OrderProducts.Include(o => o.Product).Include(o => o.Order).ThenInclude(o => o.Table).Where(o => o.Order.IsPaid == false).OrderByDescending(o => o.ID).ToListAsync();
            if (orderProducts == null)
                return NotFound();

            return Ok(orderProducts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderProduct>>> GetOrderProducts([FromRoute] int id)
        {
            var orderProducts = await _context.OrderProducts.Where(o => o.OrderID == id).Include(o => o.Product).ToListAsync();
            if (orderProducts == null)
                return NotFound();

            return Ok(orderProducts);
        }

        [HttpPost("order/{orderID}/product/{productID}")]
        public async Task<IActionResult> PostOrderProduct([FromRoute] int orderID, [FromRoute] int productID)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            OrderProduct orderProduct = new OrderProduct()
            {
                OrderID = orderID,
                ProductID = productID,
                Quantity = 1,
                IsDone = false
            };

            var product = await _context.OrderProducts.Where(o => o.OrderID == orderID).Where(o => o.ProductID == productID).Where(o => o.IsDone == false).FirstOrDefaultAsync();
            var orderProducts = await _context.OrderProducts.Where(o => o.OrderID == orderID).Where(o => o.ProductID == productID).Where(o => o.IsDone == false).CountAsync();

            if (orderProducts > 0)
                product.Quantity++;
            else
                _context.OrderProducts.Add(orderProduct);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }

            return Ok(orderProduct);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderProduct([FromRoute] int id)
        {
            var orderProduct = await _context.OrderProducts.FindAsync(id);
            if (orderProduct == null)
                return NotFound();

            _context.OrderProducts.Remove(orderProduct);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(orderProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderProduct([FromRoute] int id, [FromBody] OrderProduct orderProduct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != orderProduct.ID)
                return BadRequest();

            var existingOrderProduct = await _context.OrderProducts.FindAsync(id);

            existingOrderProduct.IsDone = !existingOrderProduct.IsDone;

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
    }
}