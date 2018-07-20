using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular6DotnetCore.Models.ViewModels
{
    public class MessageModel
    {
        public bool IsSignedIn { get; set; } = false;
        public string Email { get; set; }
        public string UserName { get; set; }
        public string ReturnUrl { get; set; }
        public string Message { get; set; }
        public bool Succeeded { get; set; } = false;
        public dynamic Results { get; set; }
    }
}
