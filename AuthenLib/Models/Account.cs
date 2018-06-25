using System;
using System.Collections.Generic;
using System.Text;

namespace AuthenLib.Models
{
    public class Account
    {
        public string Username { get; set; }        
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool Confirmed { get; set; }
        public bool Locked { get; set; }
        public bool Logged { get; set; }
    }
}
