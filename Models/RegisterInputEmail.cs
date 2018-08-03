using System.ComponentModel.DataAnnotations;

namespace angular6DotnetCore.Models
{
    public class RegisterInputEmail
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
