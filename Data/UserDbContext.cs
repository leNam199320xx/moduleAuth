using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace angular6DotnetCore.Models
{
    public class UserDbContext : IdentityDbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options) { }
        public UserDbContext() { }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Type> Types { get; set; }
        public virtual DbSet<People> Peoples { get; set; }
        public virtual DbSet<Social> Socials { get; set; }
        public virtual DbSet<PeopleSocials> PeopleSocials { get; set; }
    }
}
