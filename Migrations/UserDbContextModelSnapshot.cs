﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using angular6DotnetCore.Models;

namespace angular6DotnetCore.Migrations
{
    [DbContext(typeof(UserDbContext))]
    partial class UserDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("angular6DotnetCore.Models.Adward", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AdwardName");

                    b.Property<string>("BackgroundUrl");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<bool?>("Enabled");

                    b.Property<string>("IconUrl");

                    b.Property<int>("Index");

                    b.Property<string>("Message");

                    b.Property<string>("Tags");

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Adwards");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Career", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<bool?>("Enabled");

                    b.Property<int>("Index");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Careers");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.People", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Avatar");

                    b.Property<int>("CareerId");

                    b.Property<string>("CountryCode");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<bool?>("Enabled");

                    b.Property<string>("FullName")
                        .IsRequired();

                    b.Property<string>("ImagesUrl");

                    b.Property<int>("Index");

                    b.Property<string>("Message");

                    b.Property<string>("ShortName");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("CareerId");

                    b.ToTable("Peoples");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.PeopleAdwards", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AdwardId");

                    b.Property<DateTime?>("DetailTime");

                    b.Property<int>("PeopleId");

                    b.Property<int?>("Year");

                    b.HasKey("Id");

                    b.HasIndex("AdwardId");

                    b.HasIndex("PeopleId");

                    b.ToTable("PeopleAdwards");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.PeopleSocials", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<bool?>("Enabled");

                    b.Property<long?>("Follow");

                    b.Property<int>("Index");

                    b.Property<long?>("Like");

                    b.Property<int>("PeopleId");

                    b.Property<long?>("Share");

                    b.Property<int>("SocialId");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<string>("Url");

                    b.Property<long?>("View");

                    b.HasKey("Id");

                    b.HasIndex("PeopleId");

                    b.HasIndex("SocialId");

                    b.ToTable("PeopleSocials");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.PeopleSocialsByDate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<bool?>("Enabled");

                    b.Property<long?>("Follow");

                    b.Property<int>("Index");

                    b.Property<long?>("Like");

                    b.Property<int>("PeopleSocialsId");

                    b.Property<long?>("Share");

                    b.Property<DateTime?>("UpdatedDate");

                    b.Property<long?>("View");

                    b.HasKey("Id");

                    b.HasIndex("PeopleSocialsId");

                    b.ToTable("PeopleSocialsByDates");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Activated");

                    b.Property<DateTime?>("ActivatedDate");

                    b.Property<int?>("Cost");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<int?>("CurrencyUnitId");

                    b.Property<int?>("CurrencyUnitSaleId");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Message");

                    b.Property<int?>("PostId");

                    b.Property<int?>("ProviderId");

                    b.Property<int?>("Sale");

                    b.Property<string>("Short");

                    b.Property<int?>("Star");

                    b.Property<int?>("StateId");

                    b.Property<string>("Tags");

                    b.Property<string>("ThumbUrl");

                    b.Property<string>("Title");

                    b.Property<int?>("TopIndex");

                    b.Property<DateTime?>("UploadedDate");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyUnitId");

                    b.HasIndex("CurrencyUnitSaleId");

                    b.HasIndex("PostId");

                    b.HasIndex("ProviderId");

                    b.HasIndex("StateId");

                    b.HasIndex("UserId");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Provider", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Activated");

                    b.Property<DateTime?>("ActivatedDate");

                    b.Property<string>("Address");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<string>("ProviderCode");

                    b.Property<string>("ProviderName");

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Provider");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Social", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<bool?>("Enabled");

                    b.Property<int>("Index");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTime?>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Socials");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Type", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Activated");

                    b.Property<DateTime?>("ActivatedDate");

                    b.Property<string>("Class");

                    b.Property<DateTime?>("CreatedDate");

                    b.Property<string>("Icon");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.Property<int?>("PostId");

                    b.Property<string>("ThumbUrl");

                    b.Property<int?>("TopIndex");

                    b.Property<int?>("TypeParentId");

                    b.Property<DateTime?>("UploadedDate");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("TypeParentId");

                    b.ToTable("Type");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.People", b =>
                {
                    b.HasOne("angular6DotnetCore.Models.Career", "Career")
                        .WithMany()
                        .HasForeignKey("CareerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("angular6DotnetCore.Models.PeopleAdwards", b =>
                {
                    b.HasOne("angular6DotnetCore.Models.Adward", "Adward")
                        .WithMany()
                        .HasForeignKey("AdwardId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("angular6DotnetCore.Models.People", "People")
                        .WithMany()
                        .HasForeignKey("PeopleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("angular6DotnetCore.Models.PeopleSocials", b =>
                {
                    b.HasOne("angular6DotnetCore.Models.People", "People")
                        .WithMany()
                        .HasForeignKey("PeopleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("angular6DotnetCore.Models.Social", "Social")
                        .WithMany()
                        .HasForeignKey("SocialId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("angular6DotnetCore.Models.PeopleSocialsByDate", b =>
                {
                    b.HasOne("angular6DotnetCore.Models.PeopleSocials", "PeopleSocials")
                        .WithMany("PeopleSocialsByDates")
                        .HasForeignKey("PeopleSocialsId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Post", b =>
                {
                    b.HasOne("angular6DotnetCore.Models.Type", "CurrencyUnit")
                        .WithMany()
                        .HasForeignKey("CurrencyUnitId");

                    b.HasOne("angular6DotnetCore.Models.Type", "CurrencyUnitSale")
                        .WithMany()
                        .HasForeignKey("CurrencyUnitSaleId");

                    b.HasOne("angular6DotnetCore.Models.Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostId");

                    b.HasOne("angular6DotnetCore.Models.Provider", "Provider")
                        .WithMany()
                        .HasForeignKey("ProviderId");

                    b.HasOne("angular6DotnetCore.Models.Type", "State")
                        .WithMany()
                        .HasForeignKey("StateId");

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("angular6DotnetCore.Models.Type", b =>
                {
                    b.HasOne("angular6DotnetCore.Models.Post")
                        .WithMany("Feels")
                        .HasForeignKey("PostId");

                    b.HasOne("angular6DotnetCore.Models.Type", "TypeParent")
                        .WithMany()
                        .HasForeignKey("TypeParentId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
