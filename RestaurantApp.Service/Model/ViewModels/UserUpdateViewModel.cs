using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Service.Model.ViewModels
{
    public class UserUpdateViewModel
    {
        public string Id { get; set; }

        [MaxLength(25)]
        public string PhoneNumber { get; set; }

        [MaxLength(25)]
        public string City { get; set; }

        [MaxLength(25)]
        public string Province { get; set; }

        [MaxLength(150)]
        public string Address { get; set; }
    }
}
