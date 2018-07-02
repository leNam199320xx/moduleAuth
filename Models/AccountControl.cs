using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace angular6DotnetCore.Models
{
    [Table("AccountControl")]
    public class AccountControl
    {
        [Key, ForeignKey("AccountId")]
        public int AccountId {get;set;}
        public virtual Account Account { get; set; }
        public bool? IsConfirmed { get; set; }
        public bool? IsLocked { get; set; }
        public bool? IsLogged { get; set; }
        public bool? DeleteConfirmed { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
