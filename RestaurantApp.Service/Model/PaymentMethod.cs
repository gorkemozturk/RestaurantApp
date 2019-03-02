using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Service.Model
{
    public class PaymentMethod
    {
        public int ID { get; set; }

        [Required]
        [StringLength(45)]
        public string Name { get; set; }
    }
}
