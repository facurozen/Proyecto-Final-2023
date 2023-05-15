USE [master]
GO
/****** Object:  Database [GeriatricoDB]    Script Date: 8/5/2023 12:04:54 ******/
CREATE DATABASE [GeriatricoDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GeriatricoDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\GeriatricoDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GeriatricoDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\GeriatricoDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GeriatricoDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GeriatricoDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GeriatricoDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GeriatricoDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GeriatricoDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GeriatricoDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GeriatricoDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [GeriatricoDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GeriatricoDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GeriatricoDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GeriatricoDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GeriatricoDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GeriatricoDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GeriatricoDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GeriatricoDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GeriatricoDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GeriatricoDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GeriatricoDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GeriatricoDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GeriatricoDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GeriatricoDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GeriatricoDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GeriatricoDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GeriatricoDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GeriatricoDB] SET RECOVERY FULL 
GO
ALTER DATABASE [GeriatricoDB] SET  MULTI_USER 
GO
ALTER DATABASE [GeriatricoDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GeriatricoDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GeriatricoDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GeriatricoDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GeriatricoDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'GeriatricoDB', N'ON'
GO
ALTER DATABASE [GeriatricoDB] SET QUERY_STORE = OFF
GO
USE [GeriatricoDB]
GO
/****** Object:  User [alumno]    Script Date: 8/5/2023 12:04:54 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[MedicamentoATomar]    Script Date: 8/5/2023 12:04:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicamentoATomar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TomoMedicacion] [bit] NOT NULL,
	[IdMedicamento] [int] NOT NULL,
	[IdPaciente] [int] NOT NULL,
	[FechaHora] [datetime] NOT NULL,
 CONSTRAINT [PK_MedicamentoATomar] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicamentos]    Script Date: 8/5/2023 12:04:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamentos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](150) NOT NULL,
 CONSTRAINT [PK_Medicamentos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Paciente]    Script Date: 8/5/2023 12:04:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Paciente](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[FechaNacimiento] [date] NOT NULL,
	[Sexo] [varchar](1) NOT NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Paciente] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[MedicamentoATomar] ON 

INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (1, 0, 1, 2, CAST(N'2023-05-09T09:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (2, 0, 2, 2, CAST(N'2023-05-09T12:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (3, 0, 1, 3, CAST(N'2023-05-09T09:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (4, 0, 2, 3, CAST(N'2023-05-09T12:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (5, 0, 1, 2, CAST(N'2023-05-09T17:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[MedicamentoATomar] OFF
GO
SET IDENTITY_INSERT [dbo].[Medicamentos] ON 

INSERT [dbo].[Medicamentos] ([Id], [Nombre]) VALUES (1, N'Vitamina D')
INSERT [dbo].[Medicamentos] ([Id], [Nombre]) VALUES (2, N'Ravotril ')
SET IDENTITY_INSERT [dbo].[Medicamentos] OFF
GO
SET IDENTITY_INSERT [dbo].[Paciente] ON 

INSERT [dbo].[Paciente] ([Id], [Nombre], [Apellido], [FechaNacimiento], [Sexo], [Usuario], [Contraseña]) VALUES (2, N'Jose', N'Lopez', CAST(N'1945-11-08' AS Date), N'M', N'6133278', N'Jlopez')
INSERT [dbo].[Paciente] ([Id], [Nombre], [Apellido], [FechaNacimiento], [Sexo], [Usuario], [Contraseña]) VALUES (3, N'Elizabeth', N'Gomez', CAST(N'1943-04-05' AS Date), N'F', N'4098786', N'Egomez')
SET IDENTITY_INSERT [dbo].[Paciente] OFF
GO
ALTER TABLE [dbo].[MedicamentoATomar]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentoATomar_Medicamentos] FOREIGN KEY([IdMedicamento])
REFERENCES [dbo].[Medicamentos] ([Id])
GO
ALTER TABLE [dbo].[MedicamentoATomar] CHECK CONSTRAINT [FK_MedicamentoATomar_Medicamentos]
GO
ALTER TABLE [dbo].[MedicamentoATomar]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentoATomar_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([Id])
GO
ALTER TABLE [dbo].[MedicamentoATomar] CHECK CONSTRAINT [FK_MedicamentoATomar_Paciente]
GO
USE [master]
GO
ALTER DATABASE [GeriatricoDB] SET  READ_WRITE 
GO
