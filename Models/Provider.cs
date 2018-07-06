using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace angular6DotnetCore.Models
{
    public class Provider
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ProviderCode { get; set; }
        public string ProviderName { get; set; }
        public string Address { get; set; }
        public bool? Activated {get;set;}
        public DateTime? ActivatedDate {get;set;}
        public DateTime? UpdatedDate {get;set;}
        public DateTime? CreatedDate {get;set;}
    }
}
