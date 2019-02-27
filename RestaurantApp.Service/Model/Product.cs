using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Service.Model
{
    public class Product
    {
        public int ID { get; set; }

        [Required]
        [StringLength(35)]
        public string ProductName { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public double Tax { get; set; }
    }
}
