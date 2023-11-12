# Proyecto-Final-2023

Este es el README de nuestro proyecto final de 5to año. Es una aplicación pensada para todas aquellas personas que tienen un ser querido en un geriatrico, con el fin de poder seguir conectadas y tener acceso a mucha más información. La misma fue desarrolada con React Native, Node.js y Microsoft SQL Server. A continuación, encontrarás toda la información necesaria para comprender, configurar y ejecutar este proyecto.

# Creado con

* ![image](https://github.com/facurozen/Proyecto-Final-2023/assets/106318798/b1221d8d-d54b-42e5-9bda-6c67318a5dcc)
* ![image](https://github.com/facurozen/Proyecto-Final-2023/assets/106318798/441315cf-6874-4224-b851-27a8314f4235)
* ![image](https://github.com/facurozen/Proyecto-Final-2023/assets/106318798/0a9cc519-ac08-4111-b761-bc143cf41051)
* ![image](https://github.com/facurozen/Proyecto-Final-2023/assets/106318798/e9daf52e-08f6-4a94-bead-a136d8aa1894)

# Para comenzar

Asegúrate de seguir estos pasos para configurar el proyecto correctamente:
* Abir el Visual Studio Code
* Una vez que abrimos el Visual Studio Code, nos dirigimos a la ventana "Terminal".
* Ahí, seleccionamos la opción "Nueva Terminal"
* Al abirse la terminal, ejecutamos la siguiente linea de codigo:
* 
  ```sh
   git clone https://github.com/facurozen/Proyecto-Final-2023

   ```
* Luego de eso, seleccionamos la ventana "Archivo" "Abrir Carpeta", donde buscaremos en nuestro ordenador, la carpeta donde clonamos nuestro repositorio
* Una vez abierta la carpeta, ejecutamos lo siguiente:
* 
  ```sh
   git checkout master

   ```
* Automaticamente, a la izquierda de la pantalla, cambiara a 3 carpetas:
* > ">" backoffice
* > ">" NODE
* > ">" REACT


# Instlación

1. En la terminal escribimos: 
  ```sh
   cd NODE/

   ```
2. Después, ejecutamos lo siguiente:
```sh
   npm i

```
3. Una vez que termine de ejecutarse el comando, se descargan todos los paquetes necesarios para el funcionamiento del proryecto. Se creara una carpeta llamada "node modules".
   
4. Abrimos una nueva terminal y escribimos:
   
 ```sh
   cd REACT/

   ```
 ```sh
   cd geriatrico-frontend/

   ```
5. Después, ejecutamos lo siguiente:
```sh
   npm i

```
6. Una vez que termine de ejecutarse el comando, se descargan todos los paquetes necesarios para el funcionamiento del proryecto. Se creara una carpeta llamada "node modules".

7. Ahora, tenemos que abrir en el ordenador la aplicación Microsoft SQL Server Management Studio 18
   
8. Para conectarnos con el servidor, seguimos los siguientes pasos:
   * Server type: Database engine
   * Server name: (nombre del equipo)
   * Authetication: Windows Authetication

9. Hacemos click en el boton conectar
  
10. Ya conectados con el servidor, en la parte izquierda de la pantalla, donde se despliega un explorador de objetos, hacemos click donde dice "database"

11. Y luego, una vez que este marcado en azul, hacemos click derecho, y seleccionamos New Database...

12.  Se abrirá una nueva pantalla, donde lo único que haremos será poner en donde dice Database name: GeriatricoDB y luego clickeamos el boton "ok"

13. A continuación, iremos a la carpeta llamada "NODE" en este repositorio de GitHub y buscamos el archivo llamado GeriatricoDB.sql. Entramos, y lo descargamos.

14.  Volvemos a MSSQL, y realizamos los siguientes pasos:
     * Hacemos click en File (arriba de todo a la izquierda de la pantalla)
     * Hacemos click en Open
     * Hacemos click en File
     * Buscamos el archivo que descargamos recientemente y hacemos click en Open

15. Una vez que tengamos el archivo abierto, el mismo tendrá muchas lineas de codigo, lo único que tenemos que hacer es borrar lo siguiente (desde la linea de codigo 3, hasta la 9):

```sh
CREATE DATABASE [GeriatricoDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GeriatricoDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\GeriatricoDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GeriatricoDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\GeriatricoDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

```
    
16. Al borrar eso, ejecutamos el programa, haciendo click en el boton "execute"

17. Una vez realizados todos esos pasos, se creará la base de datos.

18. Por ultimo, tendremos que ir a la sección que dice "New query", que se encuentra arriba del botón "execute" utilizado previamente, y hacemos click.

19. Allí, ejecutaremos el siguiente codigo:   
```sh
USE [master]
GO
CREATE LOGIN [Geriatrico2] WITH PASSWORD=N'Geriatrico2', DEFAULT_DATABASE=[GeriatricoDB], CHECK_EXPIRATION=OFF,
CHECK_POLICY=OFF
GO

USE [GeriatricoDB]
GO
CREATE USER [Geriatrico2] FOR LOGIN [Geriatrico2]
GO
USE [GeriatricoDB]
GO
ALTER ROLE [db_owner] ADD MEMBER [Geriatrico2]
GO

```
20. Una vez hecho todo esto, podemos volver a Visual Studio Code

21. Vamos a la carpeta "NODE" y seleccionamos el archivo ".env"

22. Allí, en la parte "DB_SERVER", borramos el nombre de servidor que esta puesto, y lo cambiamos por el mismo nombre que utilizamos para conectarnos al servidor de MSSQL, en la parte de Server name (nombre del equipo).

23. Luego de eso, ya estamos listos para iniciar el programa. Para eso, tendremos que hacer lo siguiente:

24.  Volvemos a la terminal donde tenemos abierta la carpeta "NODE", y ejecutamos lo siguiente:
    
   **node index.js**

25. En la terminal, aparecerá un mensaje que dice "escucho"

26. Cambiamos a la otra terminal, la de REACT / geriatrico-frontend, y ejecutamos lo siguiente:
 ```sh
   npm start
   ```
27. Cuando termine de ejecutarse, abriremos una nueva pestaña en Google, y buscaremos: localhost:3000

28. Ahí, se nos abrirá la aplicación.

## Uso

Acá, te mostraremos como es nuestro proyecto, y como usarlo.

## Contacto

**Agustín Brodsky** - 
Gmail: agusbrodsky2006@gmail.com 
Instagram: agusbrod_
GitHub: 

**Facundo Rozenbaum** - 
Gmail: facurozen@gmail.com 
Instagram: facurozen
GitHub: https://github.com/facurozen





