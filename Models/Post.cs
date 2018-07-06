using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace angular6DotnetCore.Models
{
    [Table("Post")]
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Short { get; set; }
        [Range(0, 5)]
        public int? Star { get; set; }
        [Range(1, 100)]
        public int? TopIndex { get; set; }
        public string Tags { get; set; }
        public int? Cost { get; set; }
        public int? Sale { get; set; }
        public int? CurrencyUnitId { get; set; }
        [ForeignKey("CurrencyUnitId")]
        public virtual Type CurrencyUnit { get; set; }
        public int? CurrencyUnitSaleId { get; set; }
        [ForeignKey("CurrencyUnitSaleId")]
        public virtual Type CurrencyUnitSale { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbUrl { get; set; }
        public int? StateId { get; set; }
        [ForeignKey("StateId")]
        public virtual Type State { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual IdentityUser User { get; set; }

        public int? ProviderId { get; set; }
        [ForeignKey("ProviderId")]
        public virtual Provider Provider { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UploadedDate { get; set; }
        public bool? Activated { get; set; }
        public DateTime? ActivatedDate { get; set; }
        public virtual List<Type> Feels { get; set; }
        public virtual List<Post> Comments { get; set; }

    }
}