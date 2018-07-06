using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace angular6DotnetCore.Models
{
    [Table("Type")]
    public class Type
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbUrl { get; set; }
        public string Class { get; set; }
        public bool Activated { get; set; }
        public int? TopIndex { get; set; }
        public DateTime? ActivatedDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UploadedDate { get; set; }

        public int? TypeParentId { get; set; }
        [ForeignKey("TypeParentId")]
        public virtual Type TypeParent { get; set; }
    }
}