using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Service.Model
{
    public class Payment
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int PaymentMethodID { get; set; }
        public double Total { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey("PaymentMethodID")]
        public virtual PaymentMethod PaymentMethod { get; set; }
    }
}
