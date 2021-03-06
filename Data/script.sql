USE [master]
GO
/****** Object:  Database [db_users]    Script Date: 8/19/2018 6:08:36 PM ******/
CREATE DATABASE [db_users]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_users', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.NAMSERVER\MSSQL\DATA\db_users.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'db_users_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.NAMSERVER\MSSQL\DATA\db_users_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [db_users] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_users].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_users] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_users] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_users] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_users] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_users] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_users] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_users] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_users] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_users] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_users] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_users] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_users] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_users] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_users] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_users] SET  DISABLE_BROKER 
GO
ALTER DATABASE [db_users] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_users] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_users] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_users] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_users] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_users] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_users] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_users] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [db_users] SET  MULTI_USER 
GO
ALTER DATABASE [db_users] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_users] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_users] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_users] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_users] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_users] SET QUERY_STORE = OFF
GO
USE [db_users]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [db_users]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 8/19/2018 6:08:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Careers]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Careers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Index] [int] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[Enabled] [bit] NULL,
 CONSTRAINT [PK_Careers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Peoples]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Peoples](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NOT NULL,
	[ShortName] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NULL,
	[ImagesUrl] [nvarchar](max) NULL,
	[Message] [nvarchar](max) NULL,
	[Avatar] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[Index] [int] NOT NULL,
	[Enabled] [bit] NULL,
	[CareerId] [int] NOT NULL,
 CONSTRAINT [PK_Peoples] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PeopleSocials]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PeopleSocials](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PeopleId] [int] NOT NULL,
	[SocialId] [int] NOT NULL,
	[Like] [bigint] NULL,
	[View] [bigint] NULL,
	[Share] [bigint] NULL,
	[Follow] [bigint] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[Url] [nvarchar](max) NULL,
	[Index] [int] NOT NULL,
	[Enabled] [bit] NULL,
 CONSTRAINT [PK_PeopleSocials] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Post]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Post](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Message] [nvarchar](max) NULL,
	[Short] [nvarchar](max) NULL,
	[Star] [int] NULL,
	[TopIndex] [int] NULL,
	[Tags] [nvarchar](max) NULL,
	[Cost] [int] NULL,
	[Sale] [int] NULL,
	[CurrencyUnitId] [int] NULL,
	[CurrencyUnitSaleId] [int] NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[ThumbUrl] [nvarchar](max) NULL,
	[StateId] [int] NOT NULL,
	[UserId] [nvarchar](450) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UploadedDate] [datetime2](7) NULL,
	[Activated] [bit] NOT NULL,
	[ActivatedDate] [datetime2](7) NULL,
	[PostId] [int] NULL,
	[ProviderId] [int] NULL,
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Provider]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Provider](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProviderCode] [nvarchar](max) NULL,
	[ProviderName] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[Activated] [bit] NULL,
	[ActivatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[CreatedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Provider] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Socials]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Socials](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedDate] [datetime2](7) NULL,
	[Index] [int] NOT NULL,
	[Enabled] [bit] NULL,
 CONSTRAINT [PK_Socials] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Type]    Script Date: 8/19/2018 6:08:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Type](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[Class] [nvarchar](max) NULL,
	[Activated] [bit] NOT NULL,
	[TopIndex] [int] NULL,
	[ActivatedDate] [datetime2](7) NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UploadedDate] [datetime2](7) NULL,
	[TypeParentId] [int] NULL,
	[PostId] [int] NULL,
	[ThumbUrl] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NULL,
	[Icon] [nvarchar](max) NULL,
 CONSTRAINT [PK_Type] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180701102721_IdentityVer1.0.0', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180706160416_IdentityVer1.1.0', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180706163636_IdentityVer1.1.1', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180714053527_ver1.1.2', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180715074937_ver1,1,3', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180814162708_ver2.0.0', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180818082647_ver2.0.1', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180818083502_ver2.0.2', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180818084101_ver2.0.3', N'2.1.1-rtm-30846')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180818130934_ver2.0.4', N'2.1.1-rtm-30846')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'82663f1a-32c4-495b-95a1-74f958c23091', N'lenam19932012@gmail.com', N'LENAM19932012@GMAIL.COM', N'lenam19932012@gmail.com', N'LENAM19932012@GMAIL.COM', 1, N'AQAAAAEAACcQAAAAENt9HxiNOrwEvUnLRgrBac50gEwUMWhKgFOcq0gwedCv5xSmIzvCB6a9/axUTIlKkg==', N'LLWQ5CZ5MIU5674FGH2KPS6POB2RJEGU', N'fce4541c-c5c8-4c36-9562-446fb24e7d36', NULL, 0, 0, NULL, 1, 0)
SET IDENTITY_INSERT [dbo].[Careers] ON 

INSERT [dbo].[Careers] ([Id], [Index], [Name], [CreatedDate], [UpdatedDate], [Enabled]) VALUES (5, 0, N'Streamer', NULL, NULL, NULL)
INSERT [dbo].[Careers] ([Id], [Index], [Name], [CreatedDate], [UpdatedDate], [Enabled]) VALUES (6, 0, N'Singer', NULL, NULL, NULL)
INSERT [dbo].[Careers] ([Id], [Index], [Name], [CreatedDate], [UpdatedDate], [Enabled]) VALUES (7, 0, N'Model', CAST(N'2018-08-18T20:42:46.7842929' AS DateTime2), NULL, NULL)
INSERT [dbo].[Careers] ([Id], [Index], [Name], [CreatedDate], [UpdatedDate], [Enabled]) VALUES (8, 0, N'Gamer', CAST(N'2018-08-19T17:07:37.4888660' AS DateTime2), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Careers] OFF
SET IDENTITY_INSERT [dbo].[Peoples] ON 

INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (10, N'Hoàng Văn Khoa', N'Pew Pew', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p240x240/38433497_253740058781306_1624083600276193280_n.jpg?_nc_cat=0&oh=59f2330a5be8fea12172485d75be0850&oe=5BF7E56C', CAST(N'2018-08-18T20:15:29.7083904' AS DateTime2), CAST(N'2018-08-18T22:19:15.6493364' AS DateTime2), 0, NULL, 5)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (11, N'Đặng Tiến Hoàng', N'Viruss', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/c0.68.320.320/p320x320/24174409_1168155299986798_6419294238671137165_n.png?_nc_cat=1&oh=d6634038ff0b8e1952d5be16544c7d72&oe=5C3B6603', CAST(N'2018-08-18T20:42:14.8381779' AS DateTime2), NULL, 0, NULL, 5)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (12, N'Lê Thy Ngọc', N'Misthy', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p320x320/22815158_1830492470312601_6892145787736610791_n.jpg?_nc_cat=1&oh=ec5d95a8c63c8442c6d51590c8c322c2&oe=5C026798', CAST(N'2018-08-18T22:26:15.2686437' AS DateTime2), NULL, 0, NULL, 5)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (13, N'Nguyễn Thanh Tùng', N'Sơn Tùng MTP', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p320x320/36199852_2184322048248153_1682143015428161536_n.jpg?_nc_cat=1&oh=7ae320091b0911f879c3350abba0bbeb&oe=5BFB75F2', CAST(N'2018-08-18T22:29:19.6252793' AS DateTime2), NULL, 0, NULL, 6)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (14, N'Phan Thị Mỹ Tâm', N'Họa my tóc nâu', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p320x320/35974126_2215000735399986_1361880506894909440_n.jpg?_nc_cat=1&oh=9fceae345282180ed0037f2952bcdd24&oe=5BF4D76E', CAST(N'2018-08-18T22:31:46.3591686' AS DateTime2), CAST(N'2018-08-18T22:36:39.3886565' AS DateTime2), 0, NULL, 6)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (15, N'Phùng Thanh Độ', N'Mixi', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p160x160/32087335_1268135656653666_839532180697776128_n.jpg?_nc_cat=1&oh=045255fb64ad3c0948585775a7835e1b&oe=5C03854A', CAST(N'2018-08-19T17:03:46.5253516' AS DateTime2), NULL, 0, NULL, 5)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (16, N'Nghiêm Xuân Hiếu', N'Xemesis', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p200x200/36776593_1304229523013004_2260151639585325056_n.jpg?_nc_cat=0&oh=c74917941f311499ec168b1225f2cfaa&oe=5BF19A08', CAST(N'2018-08-19T17:06:02.3424320' AS DateTime2), NULL, 0, NULL, 5)
INSERT [dbo].[Peoples] ([Id], [FullName], [ShortName], [Url], [ImagesUrl], [Message], [Avatar], [CreatedDate], [UpdatedDate], [Index], [Enabled], [CareerId]) VALUES (17, N'Nguyễn Đức Bình', N'Chim sẻ đi nắng', NULL, NULL, NULL, N'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-1/p200x200/36636854_1701779676543326_8518887513572507648_n.jpg?_nc_cat=1&oh=169a22cff48339bc68aa418237c0ffc0&oe=5BF198C8', CAST(N'2018-08-19T17:08:44.8536741' AS DateTime2), NULL, 0, NULL, 8)
SET IDENTITY_INSERT [dbo].[Peoples] OFF
SET IDENTITY_INSERT [dbo].[PeopleSocials] ON 

INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (2, 10, 4, 1595670, 123, 123, 1821920, CAST(N'2018-08-19T12:28:33.0339924' AS DateTime2), CAST(N'2018-08-19T13:47:51.3928280' AS DateTime2), N'https://www.facebook.com/mcpewpewvn/', 0, NULL)
INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (3, 10, 6, 123456, 123456, 123456, NULL, CAST(N'2018-08-19T12:35:22.3149227' AS DateTime2), NULL, N'123456', 0, NULL)
INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (4, 11, 4, 913512, 1232, 1231, 1096688, CAST(N'2018-08-19T12:44:30.4253405' AS DateTime2), CAST(N'2018-08-19T15:15:17.9276771' AS DateTime2), N'https://www.facebook.com/ViruSsOP/', 0, NULL)
INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (5, 11, 6, 54, 5433, 54, 544, CAST(N'2018-08-19T12:45:42.2975955' AS DateTime2), NULL, N'455345', 0, NULL)
INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (6, 15, 4, 139619, NULL, NULL, 149054, CAST(N'2018-08-19T17:04:01.7348162' AS DateTime2), CAST(N'2018-08-19T17:04:33.7121316' AS DateTime2), N'https://www.facebook.com/MixiGaming/', 0, NULL)
INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (7, 16, 4, 27081, NULL, NULL, 27889, CAST(N'2018-08-19T17:06:21.9356198' AS DateTime2), NULL, N'https://www.facebook.com/XemesisVN/', 0, NULL)
INSERT [dbo].[PeopleSocials] ([Id], [PeopleId], [SocialId], [Like], [View], [Share], [Follow], [CreatedDate], [UpdatedDate], [Url], [Index], [Enabled]) VALUES (8, 17, 4, 160083, NULL, NULL, 182314, CAST(N'2018-08-19T17:08:59.6317463' AS DateTime2), NULL, N'https://www.facebook.com/chimsedinangFanpage/', 0, NULL)
SET IDENTITY_INSERT [dbo].[PeopleSocials] OFF
SET IDENTITY_INSERT [dbo].[Socials] ON 

INSERT [dbo].[Socials] ([Id], [Name], [CreatedDate], [UpdatedDate], [Index], [Enabled]) VALUES (4, N'Facebook', CAST(N'2018-08-18T16:31:43.4958782' AS DateTime2), CAST(N'2018-08-18T16:31:43.4959866' AS DateTime2), 0, NULL)
INSERT [dbo].[Socials] ([Id], [Name], [CreatedDate], [UpdatedDate], [Index], [Enabled]) VALUES (5, N'Google Plus', CAST(N'2018-08-18T20:44:23.1694741' AS DateTime2), NULL, 0, NULL)
INSERT [dbo].[Socials] ([Id], [Name], [CreatedDate], [UpdatedDate], [Index], [Enabled]) VALUES (6, N'Twitter', CAST(N'2018-08-18T20:44:31.7134177' AS DateTime2), NULL, 0, NULL)
SET IDENTITY_INSERT [dbo].[Socials] OFF
SET IDENTITY_INSERT [dbo].[Type] ON 

INSERT [dbo].[Type] ([Id], [Name], [ImageUrl], [Class], [Activated], [TopIndex], [ActivatedDate], [CreatedDate], [UploadedDate], [TypeParentId], [PostId], [ThumbUrl], [Url], [Icon]) VALUES (2, N'Tin tức', NULL, N'Category', 1, NULL, CAST(N'2018-07-14T12:07:32.3870695' AS DateTime2), CAST(N'2018-07-14T12:07:32.3870672' AS DateTime2), CAST(N'2018-07-14T15:06:32.2670687' AS DateTime2), NULL, NULL, NULL, N'tin-tuc', NULL)
INSERT [dbo].[Type] ([Id], [Name], [ImageUrl], [Class], [Activated], [TopIndex], [ActivatedDate], [CreatedDate], [UploadedDate], [TypeParentId], [PostId], [ThumbUrl], [Url], [Icon]) VALUES (4, N'Sản phẩm', NULL, N'category', 1, NULL, CAST(N'2018-07-15T16:15:45.9580281' AS DateTime2), CAST(N'2018-07-15T16:15:45.9579414' AS DateTime2), NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Type] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Peoples_CareerId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Peoples_CareerId] ON [dbo].[Peoples]
(
	[CareerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_PeopleSocials_PeopleId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_PeopleSocials_PeopleId] ON [dbo].[PeopleSocials]
(
	[PeopleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_PeopleSocials_SocialId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_PeopleSocials_SocialId] ON [dbo].[PeopleSocials]
(
	[SocialId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Post_CurrencyUnitId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Post_CurrencyUnitId] ON [dbo].[Post]
(
	[CurrencyUnitId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Post_CurrencyUnitSaleId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Post_CurrencyUnitSaleId] ON [dbo].[Post]
(
	[CurrencyUnitSaleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Post_PostId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Post_PostId] ON [dbo].[Post]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Post_ProviderId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Post_ProviderId] ON [dbo].[Post]
(
	[ProviderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Post_StateId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Post_StateId] ON [dbo].[Post]
(
	[StateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Post_UserId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Post_UserId] ON [dbo].[Post]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Type_PostId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Type_PostId] ON [dbo].[Type]
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Type_TypeParentId]    Script Date: 8/19/2018 6:08:37 PM ******/
CREATE NONCLUSTERED INDEX [IX_Type_TypeParentId] ON [dbo].[Type]
(
	[TypeParentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Peoples] ADD  DEFAULT ((0)) FOR [Index]
GO
ALTER TABLE [dbo].[Peoples] ADD  DEFAULT ((0)) FOR [CareerId]
GO
ALTER TABLE [dbo].[PeopleSocials] ADD  DEFAULT ((0)) FOR [Index]
GO
ALTER TABLE [dbo].[Socials] ADD  DEFAULT ((0)) FOR [Index]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Peoples]  WITH CHECK ADD  CONSTRAINT [FK_Peoples_Careers_CareerId] FOREIGN KEY([CareerId])
REFERENCES [dbo].[Careers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Peoples] CHECK CONSTRAINT [FK_Peoples_Careers_CareerId]
GO
ALTER TABLE [dbo].[PeopleSocials]  WITH CHECK ADD  CONSTRAINT [FK_PeopleSocials_Peoples_PeopleId] FOREIGN KEY([PeopleId])
REFERENCES [dbo].[Peoples] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PeopleSocials] CHECK CONSTRAINT [FK_PeopleSocials_Peoples_PeopleId]
GO
ALTER TABLE [dbo].[PeopleSocials]  WITH CHECK ADD  CONSTRAINT [FK_PeopleSocials_Socials_SocialId] FOREIGN KEY([SocialId])
REFERENCES [dbo].[Socials] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PeopleSocials] CHECK CONSTRAINT [FK_PeopleSocials_Socials_SocialId]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Post_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Post_PostId]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Provider_ProviderId] FOREIGN KEY([ProviderId])
REFERENCES [dbo].[Provider] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Provider_ProviderId]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Type_CurrencyUnitId] FOREIGN KEY([CurrencyUnitId])
REFERENCES [dbo].[Type] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Type_CurrencyUnitId]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Type_CurrencyUnitSaleId] FOREIGN KEY([CurrencyUnitSaleId])
REFERENCES [dbo].[Type] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Type_CurrencyUnitSaleId]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Type_StateId] FOREIGN KEY([StateId])
REFERENCES [dbo].[Type] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Type_StateId]
GO
ALTER TABLE [dbo].[Type]  WITH CHECK ADD  CONSTRAINT [FK_Type_Post_PostId] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Type] CHECK CONSTRAINT [FK_Type_Post_PostId]
GO
ALTER TABLE [dbo].[Type]  WITH CHECK ADD  CONSTRAINT [FK_Type_Type_TypeParentId] FOREIGN KEY([TypeParentId])
REFERENCES [dbo].[Type] ([Id])
GO
ALTER TABLE [dbo].[Type] CHECK CONSTRAINT [FK_Type_Type_TypeParentId]
GO
USE [master]
GO
ALTER DATABASE [db_users] SET  READ_WRITE 
GO
