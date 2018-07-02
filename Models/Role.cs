using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace angular6DotnetCore.Models
{
    public class Role
    {
        [Key]
        public string RoleCode { get; set; }
        public string RoleName { get; set; }
        public virtual List<Account> Accounts { get; set; }
    }
}
