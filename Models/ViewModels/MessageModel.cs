using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular6DotnetCore.Models.ViewModels
{
    public class MessageModel
    {
        public bool isSignedIn { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string ReturnUrl { get; set; }
        public string Message { get; set; }
        public dynamic Results { get; set; }
    }
}
