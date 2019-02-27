using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Service.Model
{
    public class Table
    {
        public int ID { get; set; }

        [Required]
        [StringLength(10)]
        public string TableName { get; set; }
        public bool IsAvailable { get; set; }
    }
}
