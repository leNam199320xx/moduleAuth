using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Design;
namespace angular6DotnetCore.Models
{
    [Table("Account")]
    public class Account
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDay { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public DateTime CreatedDate { get; set; }

        [ForeignKey("RoleCode")]
        public string RoleCode { get; set; }
        public virtual Role Role { get; set; }
        [ForeignKey("ProviderCode")]
        public string ProviderCode { get; set; }
        public virtual Provider Provider { get; set; }

        public virtual AccountControl AccountControl { get; set; }
    }
}
