USE [master]
GO
/****** Object:  Database [GeriatricoDB]    Script Date: 8/8/2023 14:29:44 ******/
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
/****** Object:  User [Geriatrico2]    Script Date: 8/8/2023 14:29:44 ******/
CREATE USER [Geriatrico2] FOR LOGIN [Geriatrico2] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 8/8/2023 14:29:44 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Geriatrico2]
GO
/****** Object:  Table [dbo].[FechasRelevantes]    Script Date: 8/8/2023 14:29:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FechasRelevantes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [date] NOT NULL,
	[Texto] [varchar](200) NOT NULL,
	[Hora] [time](7) NOT NULL,
	[Imagen] [varchar](200) NOT NULL,
 CONSTRAINT [PK_FechasRelevantes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistoriaClinica]    Script Date: 8/8/2023 14:29:44 ******/
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
/****** Object:  Table [dbo].[Informe]    Script Date: 8/8/2023 14:29:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Informe](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Texto] [varchar](200) NOT NULL,
	[FechaHoy] [date] NOT NULL,
	[IdPaciente] [int] NULL,
 CONSTRAINT [PK_Informe] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Kinesiologia]    Script Date: 8/8/2023 14:29:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Kinesiologia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FechaInicio] [date] NOT NULL,
	[Texto] [varchar](200) NOT NULL,
	[Medico] [varchar](100) NOT NULL,
	[FechaHoy] [date] NOT NULL,
	[IdPaciente] [int] NULL,
 CONSTRAINT [PK_Kinesiologia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicamentoATomar]    Script Date: 8/8/2023 14:29:44 ******/
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
/****** Object:  Table [dbo].[Medicamentos]    Script Date: 8/8/2023 14:29:44 ******/
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
/****** Object:  Table [dbo].[Paciente]    Script Date: 8/8/2023 14:29:44 ******/
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
/****** Object:  Table [dbo].[Usuario]    Script Date: 8/8/2023 14:29:44 ******/
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
/****** Object:  Table [dbo].[Visitas]    Script Date: 8/8/2023 14:29:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Visitas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Fecha] [date] NOT NULL,
	[HoraDeLlegada] [time](7) NOT NULL,
	[HoraDeSalida] [time](7) NOT NULL,
	[Ocupado] [bit] NULL,
	[IdPaciente] [int] NULL,
 CONSTRAINT [PK_Visitas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[FechasRelevantes] ON 

INSERT [dbo].[FechasRelevantes] ([Id], [Fecha], [Texto], [Hora], [Imagen]) VALUES (1, CAST(N'2023-07-10' AS Date), N'Show de Stand Up', CAST(N'11:00:00' AS Time), N'https://upload.wikimedia.org/wikipedia/commons/e/e2/Bjnovak.jpg')
INSERT [dbo].[FechasRelevantes] ([Id], [Fecha], [Texto], [Hora], [Imagen]) VALUES (2, CAST(N'2023-07-26' AS Date), N'Tisha BeAv', CAST(N'00:00:00' AS Time), N'https://tierrasantaparatodos.com/ws/wp-content/uploads/2015/08/Tisha-B-Av-Francesco_Hayez_017.jpg')
INSERT [dbo].[FechasRelevantes] ([Id], [Fecha], [Texto], [Hora], [Imagen]) VALUES (3, CAST(N'2023-07-27' AS Date), N'Tisha BeAv dia 2', CAST(N'00:00:00' AS Time), N'https://i0.wp.com/www.enlacejudio.com/wp-content/uploads/2018/07/Tisha-Bva.jpg?fit=1575%2C822&ssl=1')
INSERT [dbo].[FechasRelevantes] ([Id], [Fecha], [Texto], [Hora], [Imagen]) VALUES (4, CAST(N'2023-07-05' AS Date), N'Taller de cocina', CAST(N'10:30:00' AS Time), N'https://www.aita-menni.org/wp-content/uploads/2021/09/residencia-ancianos-bilbao-cocina-2.jpg')
SET IDENTITY_INSERT [dbo].[FechasRelevantes] OFF
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
SET IDENTITY_INSERT [dbo].[Informe] ON 

INSERT [dbo].[Informe] ([Id], [Texto], [FechaHoy], [IdPaciente]) VALUES (1, N'Medicamentos al dia. Actividad normal. Presion arterial mejorada.', CAST(N'2023-07-07' AS Date), 1)
INSERT [dbo].[Informe] ([Id], [Texto], [FechaHoy], [IdPaciente]) VALUES (2, N'Medicamentos al dia. actividad reducida por poco sueño. Presion arterial alta.', CAST(N'2023-07-06' AS Date), 1)
SET IDENTITY_INSERT [dbo].[Informe] OFF
GO
SET IDENTITY_INSERT [dbo].[Kinesiologia] ON 

INSERT [dbo].[Kinesiologia] ([Id], [FechaInicio], [Texto], [Medico], [FechaHoy], [IdPaciente]) VALUES (1, CAST(N'2023-04-03' AS Date), N'Se encuentra con ejercicios de rehabilitación, mejorando pero aun no a pleno', N'Dr. Pires', CAST(N'2023-07-07' AS Date), 1)
INSERT [dbo].[Kinesiologia] ([Id], [FechaInicio], [Texto], [Medico], [FechaHoy], [IdPaciente]) VALUES (2, CAST(N'2023-04-03' AS Date), N'Se encuentra comenzando el tratamiento, veremos la evolución', N'Dr Pires', CAST(N'2023-06-30' AS Date), 1)
SET IDENTITY_INSERT [dbo].[Kinesiologia] OFF
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
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Usuario], [Contraseña]) VALUES (1, N'4873213', N'Jlopez')
INSERT [dbo].[Usuario] ([Id], [Usuario], [Contraseña]) VALUES (2, N'3098216', N'MGomez')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
SET IDENTITY_INSERT [dbo].[Visitas] ON 

INSERT [dbo].[Visitas] ([Id], [Nombre], [Fecha], [HoraDeLlegada], [HoraDeSalida], [Ocupado], [IdPaciente]) VALUES (1, N'Franco Lopez', CAST(N'2023-08-15' AS Date), CAST(N'13:00:00' AS Time), CAST(N'14:00:00' AS Time), 1, 1)
INSERT [dbo].[Visitas] ([Id], [Nombre], [Fecha], [HoraDeLlegada], [HoraDeSalida], [Ocupado], [IdPaciente]) VALUES (2, N'Juan Lopez', CAST(N'2023-08-15' AS Date), CAST(N'14:00:00' AS Time), CAST(N'15:00:00' AS Time), 1, 1)
INSERT [dbo].[Visitas] ([Id], [Nombre], [Fecha], [HoraDeLlegada], [HoraDeSalida], [Ocupado], [IdPaciente]) VALUES (4, N'Fernanda Martinez', CAST(N'2023-08-15' AS Date), CAST(N'16:00:00' AS Time), CAST(N'17:00:00' AS Time), 1, 1)
SET IDENTITY_INSERT [dbo].[Visitas] OFF
GO
ALTER TABLE [dbo].[HistoriaClinica]  WITH CHECK ADD  CONSTRAINT [FK_HistoriaClinica_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([IdPaciente])
GO
ALTER TABLE [dbo].[HistoriaClinica] CHECK CONSTRAINT [FK_HistoriaClinica_Paciente]
GO
ALTER TABLE [dbo].[Informe]  WITH CHECK ADD  CONSTRAINT [FK_Informe_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([IdPaciente])
GO
ALTER TABLE [dbo].[Informe] CHECK CONSTRAINT [FK_Informe_Paciente]
GO
ALTER TABLE [dbo].[Kinesiologia]  WITH CHECK ADD  CONSTRAINT [FK_Kinesiologia_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([IdPaciente])
GO
ALTER TABLE [dbo].[Kinesiologia] CHECK CONSTRAINT [FK_Kinesiologia_Paciente]
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
ALTER TABLE [dbo].[Visitas]  WITH CHECK ADD  CONSTRAINT [FK_Visitas_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([IdPaciente])
GO
ALTER TABLE [dbo].[Visitas] CHECK CONSTRAINT [FK_Visitas_Paciente]
GO
USE [master]
GO
ALTER DATABASE [GeriatricoDB] SET  READ_WRITE 
GO
