using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace angular6DotnetCore.Models
{
    public class People : GeneralColumn
    {
        [Required]
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string Url { get; set; }
        public string ImagesUrl { get; set; }
        public string Message { get; set; }
        public string Avatar { get; set; }
        //public virtual List<PeopleSocials> PeopleSocials { get; set; }
        public int CareerId { get; set; }
        [ForeignKey("CareerId")]
        public virtual Career Career { get; set; }
        public string CountryCode { get; set; }
    }

    public class PeopleSocials : GeneralColumn
    {
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
        public string Url { get; set; }
        public virtual List<PeopleSocialsByDate> PeopleSocialsByDates { get; set; }
    }

    public class PeopleSocialsByDate : GeneralColumn
    {
        public int PeopleSocialsId { get; set; }
        [ForeignKey("PeopleSocialsId")]
        public PeopleSocials PeopleSocials { get; set; }
        public long? Like { get; set; }
        public long? View { get; set; }
        public long? Share { get; set; }
        public long? Follow { get; set; }
        public PeopleSocialsByDate()
        {
            CreatedDate = DateTime.Now;
        }
    }

    public class PeopleSocialsTotal : PeopleSocials
    {
        public long Total { get; set; }
        public long getTotal()
        {
            Total = Like ?? 0 + Share ?? 0 + View ?? 0 + Follow ?? 0;
            return Total;
        }
    }

    public class Social : GeneralColumn
    {
        [Required]
        public string Name { get; set; }
        //public virtual List<PeopleSocials> PeopleSocials { get; set; }
    }

    public class Career : GeneralColumn
    {
        [Required]
        public string Name { get; set; }
        //public virtual List<People> Peoples { get; set; }
    }

    public class GeneralColumn : GeneralColumnNoId
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
    }


    public class GeneralColumnNoId
    {
        public int Index { get; set; }
        public bool? Enabled { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
