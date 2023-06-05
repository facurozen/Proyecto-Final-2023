USE [master]
GO
/****** Object:  Database [GeriatricoDB]    Script Date: 5/6/2023 12:05:06 ******/
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
/****** Object:  User [Pizzas]    Script Date: 5/6/2023 12:05:06 ******/
CREATE USER [Pizzas] FOR LOGIN [Geriatrico] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Geriatrico1]    Script Date: 5/6/2023 12:05:06 ******/
CREATE USER [Geriatrico1] FOR LOGIN [Geriatrico1] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 5/6/2023 12:05:06 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Geriatrico1]
GO
/****** Object:  Table [dbo].[HistoriaClinica]    Script Date: 5/6/2023 12:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoriaClinica](
	[Fecha] [date] NOT NULL,
	[Texto] [varchar](500) NOT NULL,
	[IdPaciente] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicamentoATomar]    Script Date: 5/6/2023 12:05:06 ******/
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
/****** Object:  Table [dbo].[Medicamentos]    Script Date: 5/6/2023 12:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamentos](
	[IdMedicamento] [int] IDENTITY(1,1) NOT NULL,
	[NombreMedicamento] [varchar](150) NOT NULL,
 CONSTRAINT [PK_Medicamentos] PRIMARY KEY CLUSTERED 
(
	[IdMedicamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Paciente]    Script Date: 5/6/2023 12:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Paciente](
	[IdPaciente] [int] IDENTITY(1,1) NOT NULL,
	[NombrePaciente] [varchar](100) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[FechaNacimiento] [date] NOT NULL,
	[Sexo] [varchar](1) NOT NULL,
	[ObraSocial] [varchar](50) NOT NULL,
	[PlanObraSocial] [varchar](50) NOT NULL,
	[TelEmergencia] [varchar](10) NOT NULL,
	[IdUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Paciente] PRIMARY KEY CLUSTERED 
(
	[IdPaciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Policias]    Script Date: 5/6/2023 12:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Policias](
	[IdPolicia] [int] IDENTITY(1,1) NOT NULL,
	[DNI] [int] NOT NULL,
	[nombre] [varchar](max) NOT NULL,
	[numeroPlaca] [varchar](max) NOT NULL,
	[Rol] [varchar](max) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[Password] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Policias] PRIMARY KEY CLUSTERED 
(
	[DNI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rutas]    Script Date: 5/6/2023 12:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rutas](
	[IdRuta] [int] IDENTITY(1,1) NOT NULL,
	[longitudInicial] [float] NOT NULL,
	[latitudInicial] [float] NOT NULL,
	[direccionInicial] [varchar](max) NOT NULL,
	[longitudFinal] [float] NOT NULL,
	[latitudFinal] [float] NOT NULL,
	[direccionFinal] [varchar](max) NOT NULL,
	[fecha] [date] NOT NULL,
	[horaInicial] [datetime] NOT NULL,
	[horaFinal] [datetime] NOT NULL,
	[activo] [bit] NOT NULL,
	[fkPolicia] [int] NOT NULL,
 CONSTRAINT [PK_Rutas] PRIMARY KEY CLUSTERED 
(
	[IdRuta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 5/6/2023 12:05:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2022-12-18' AS Date), N'Primer control. Peso:70kg. Altura:1,70. Padece dificultades al caminar. Debera tomar Vitamina D', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-01-02' AS Date), N'Peso:70,5. Altura 1,70. No presentó otro inconveniente.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-01-18' AS Date), N'Se atendió por problemas de sueño, se le recetó benzodiacepinas.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-02-01' AS Date), N'Peso:70,1. Altura:1,70. Continúa tomando medicamentos para el sueño. Mejoró la presión arterial despues de un pequeño desbalance.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-02-16' AS Date), N'Peso:70,3. Altura:1,70. Mejorando su sueño, presión con pequeños imperfctos pero normal.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-02-20' AS Date), N'Fractura de cadera y comenzó kinesiologia', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-03-03' AS Date), N'Peso:69,8. Altura:1,69. Avanza aunque lentamente con la recuperación.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-03-19' AS Date), N'Peso:69,9. Altura:1,69. Volvió a caminar lentamente. No presentó otro inconveniente.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-04-05' AS Date), N'Volvió a tener problemas de sueño, esta vez por una situacion familiar.', 1)
INSERT [dbo].[HistoriaClinica] ([Fecha], [Texto], [IdPaciente]) VALUES (CAST(N'2023-04-10' AS Date), N'Mejora su calidad de sueño lentamente, le recetamos ravotril.', 1)
GO
SET IDENTITY_INSERT [dbo].[MedicamentoATomar] ON 

INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (1, 1, 1, 1, CAST(N'2023-05-09T09:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (2, 0, 2, 1, CAST(N'2023-05-09T12:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (3, 1, 1, 2, CAST(N'2023-05-09T09:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (4, 0, 2, 2, CAST(N'2023-05-09T12:00:00.000' AS DateTime))
INSERT [dbo].[MedicamentoATomar] ([Id], [TomoMedicacion], [IdMedicamento], [IdPaciente], [FechaHora]) VALUES (5, 0, 1, 1, CAST(N'2023-05-09T17:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[MedicamentoATomar] OFF
GO
SET IDENTITY_INSERT [dbo].[Medicamentos] ON 

INSERT [dbo].[Medicamentos] ([IdMedicamento], [NombreMedicamento]) VALUES (1, N'Vitamina D')
INSERT [dbo].[Medicamentos] ([IdMedicamento], [NombreMedicamento]) VALUES (2, N'Ravotril ')
SET IDENTITY_INSERT [dbo].[Medicamentos] OFF
GO
SET IDENTITY_INSERT [dbo].[Paciente] ON 

INSERT [dbo].[Paciente] ([IdPaciente], [NombrePaciente], [Apellido], [FechaNacimiento], [Sexo], [ObraSocial], [PlanObraSocial], [TelEmergencia], [IdUsuario]) VALUES (1, N'José', N'Lopez', CAST(N'1943-06-08' AS Date), N'M', N'Osde', N'310', N'1137423366', 1)
INSERT [dbo].[Paciente] ([IdPaciente], [NombrePaciente], [Apellido], [FechaNacimiento], [Sexo], [ObraSocial], [PlanObraSocial], [TelEmergencia], [IdUsuario]) VALUES (2, N'Marta', N'Gomez', CAST(N'1938-04-09' AS Date), N'F', N'Swiss Medical', N'Plan Black', N'1157329874', 2)
SET IDENTITY_INSERT [dbo].[Paciente] OFF
GO
SET IDENTITY_INSERT [dbo].[Policias] ON 

INSERT [dbo].[Policias] ([IdPolicia], [DNI], [nombre], [numeroPlaca], [Rol], [fechaNacimiento], [Password]) VALUES (1, 47206175, N'Federico Sznajderhaus', N'placa', N'Vial', CAST(N'2006-07-04' AS Date), N'1234')
SET IDENTITY_INSERT [dbo].[Policias] OFF
GO
SET IDENTITY_INSERT [dbo].[Rutas] ON 

INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (2, -3460423425039409, -58415583984804880, N'Billinghurst 471', -3460537606827656, -5841867611313886, N'Sarmiento 3802', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T06:00:00.000' AS DateTime), CAST(N'2023-05-15T08:00:00.000' AS DateTime), 1, 47206175)
INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (10, -34605393729721284, -5841859296466615, N'Sarmiento 3802', -3459169367097808, -58419275116615152, N'Avenida Medrano, Costa Rica &, C1176 Buenos Aires', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T08:00:00.000' AS DateTime), CAST(N'2023-05-15T09:30:00.000' AS DateTime), 1, 47206175)
INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (15, -3459169367097808, -58419275116615152, N'Avenida Medrano, Costa Rica &, C1176 Buenos Aires', -3458927710667122, -5841617847273245, N'Medrano, Charcas y, 1746 Palermo', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T09:30:00.000' AS DateTime), CAST(N'2023-05-15T11:00:00.000' AS DateTime), 1, 47206175)
INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (18, -3458927710667122, -5841617847273245, N'Medrano, Charcas y, 1746 Palermo', -34597435629721472, -584077497007658, N'999,C1170ACQ, Dr. Tomás Manuel de Anchorena 901, C1170ACQ CABA', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T11:00:00.000' AS DateTime), CAST(N'2023-05-15T12:30:00.000' AS DateTime), 1, 47206175)
INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (19, -34597435629721472, -584077497007658, N'999,C1170ACQ, Dr. Tomás Manuel de Anchorena 901, C1170ACQ CABA', -3459877367461269, -5839869469500792, N'Pres. José Evaristo Uriburu 1027, C1114 AAA, Buenos Aires', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T12:30:00.000' AS DateTime), CAST(N'2023-05-15T14:00:00.000' AS DateTime), 1, 47206175)
INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (21, -3459877367461269, -5839869469500792, N'Pres. José Evaristo Uriburu 1027, C1114 AAA, Buenos Aires', -34597882704369056, -58392777361689920, N'Av. Callao 951, C1021 CABA', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T14:00:00.000' AS DateTime), CAST(N'2023-05-15T15:00:00.000' AS DateTime), 1, 47206175)
INSERT [dbo].[Rutas] ([IdRuta], [longitudInicial], [latitudInicial], [direccionInicial], [longitudFinal], [latitudFinal], [direccionFinal], [fecha], [horaInicial], [horaFinal], [activo], [fkPolicia]) VALUES (22, -34597882704369056, -58392777361689920, N'Av. Callao 951, C1021 CABA', -34604243420982184, -5841556898867309, N'Billinghurst 471, C1174 CABA', CAST(N'2023-05-15' AS Date), CAST(N'2023-05-15T15:00:00.000' AS DateTime), CAST(N'2023-05-15T16:00:00.000' AS DateTime), 1, 47206175)
SET IDENTITY_INSERT [dbo].[Rutas] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Usuario], [Contraseña]) VALUES (1, N'4873213', N'Jlopez')
INSERT [dbo].[Usuario] ([Id], [Usuario], [Contraseña]) VALUES (2, N'3098216', N'MGomez')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[MedicamentoATomar]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentoATomar_Medicamentos] FOREIGN KEY([IdMedicamento])
REFERENCES [dbo].[Medicamentos] ([IdMedicamento])
GO
ALTER TABLE [dbo].[MedicamentoATomar] CHECK CONSTRAINT [FK_MedicamentoATomar_Medicamentos]
GO
ALTER TABLE [dbo].[MedicamentoATomar]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentoATomar_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([IdPaciente])
GO
ALTER TABLE [dbo].[MedicamentoATomar] CHECK CONSTRAINT [FK_MedicamentoATomar_Paciente]
GO
ALTER TABLE [dbo].[Paciente]  WITH CHECK ADD  CONSTRAINT [FK_Paciente_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Paciente] CHECK CONSTRAINT [FK_Paciente_Usuario]
GO
ALTER TABLE [dbo].[Rutas]  WITH CHECK ADD  CONSTRAINT [FK_Rutas_Policias] FOREIGN KEY([fkPolicia])
REFERENCES [dbo].[Policias] ([DNI])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Rutas] CHECK CONSTRAINT [FK_Rutas_Policias]
GO
USE [master]
GO
ALTER DATABASE [GeriatricoDB] SET  READ_WRITE 
GO
