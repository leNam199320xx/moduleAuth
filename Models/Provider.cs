using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace angular6DotnetCore.Models
{
    public class Provider
    {
        [Key]
        public string ProviderCode { get; set; }
        public string ProviderName { get; set; }
        public virtual List<Account> Accounts { get; set; }
    }
}
