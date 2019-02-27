using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Service.Model
{
    public class Order
    {
        public int ID { get; set; }
        public int TableID { get; set; }
        public string UserID { get; set; }

        [Required]
        [StringLength(50)]
        public string OrderName { get; set; }

        public double Total { get; set; }
        public bool IsPaid { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey("TableID")]
        public virtual Table Table { get; set; }

        [ForeignKey("UserID")]
        public virtual ApplicationUser Waiter { get; set; }
    }
}
