﻿using System;
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

            var product = await _context.OrderProducts.Where(o => o.OrderID == orderID).Where(o => o.ProductID == productID).FirstOrDefaultAsync();
            var orderProducts = await _context.OrderProducts.Where(o => o.OrderID == orderID).Where(o => o.ProductID == productID).CountAsync();

            if (orderProducts > 0)
                product.Quantity++;
            else
                _context.OrderProducts.Add(orderProduct);

            await _context.SaveChangesAsync();

            return Ok(orderProduct);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderProduct([FromRoute] int id)
        {
            var orderProduct = await _context.OrderProducts.FindAsync(id);
            if (orderProduct == null)
                return NotFound();

            _context.OrderProducts.Remove(orderProduct);
            await _context.SaveChangesAsync();

            return Ok(orderProduct);
        }
    }
}