using System.ComponentModel.DataAnnotations;

namespace angular6DotnetCore.Models
{
    public class LoginInput
    {
        [Required(ErrorMessage = "You need input a email address")]
        [DataType(DataType.EmailAddress, ErrorMessage = "Email type is fail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "You need input your password")]
        [DataType(DataType.Password, ErrorMessage = "Password type is fail")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }
    }
}
