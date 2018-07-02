using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular6DotnetCore.Models.ViewModels
{
    public class AccountToken
    {
        public string AccessToken { get; set; }
        public int ExpireDate { get; set; }
    }
}
