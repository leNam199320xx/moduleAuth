using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace angular6DotnetCore.Models
{
    public class People
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Url { get; set; }
        public string ImagesUrl { get; set; }
        public string Message { get; set; }
        public string Avatar { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public virtual List<PeopleSocials> PeopleSocials { get; set; }
    }

    public class PeopleSocials
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PeopleId { get; set; }
        [ForeignKey("PeopleId")]
        public virtual People People { get; set; }
        public int SocialId { get; set; }
        [ForeignKey("SocialId")]
        public virtual Social Social { get; set; }
        public long? Like { get; set; }
        public long? View { get; set; }
        public long? Share { get; set; }
        public long? Follow { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    public class Social
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public virtual List<PeopleSocials> PeopleSocials { get; set; }
    }

    public class Career
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Index { get; set; }
        public string Name { get; set; }
    }

    public class CareerPeoples
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CareerId { get; set; }
        [ForeignKey("CareerId")]
        public virtual Career Career { get; set; }
        public int PeopleId { get; set; }
        [ForeignKey("PeopleId")]
        public virtual People People { get; set; }
    }
}
