# Semana 6 - Tarea 1  
## Login Simple en Angular y .NET con Validación de Sesión
## Descripción
Este proyecto corresponde a la actividad académica Semana 6 - Tarea 1, cuyo objetivo fue desarrollar un sistema de autenticación básico que permita iniciar sesión desde Angular consumiendo una API en .NET, almacenar el usuario en el navegador y validar la sesión desde el backend. El sistema implementa un flujo completo cliente-servidor simulando el comportamiento de aplicaciones reales de autenticación utilizadas en entornos profesionales.
## Objetivo de la tarea
Desarrollar un login funcional que:
- Permita autenticación desde Angular
- Consuma un backend en .NET
- Guarde el nombre del usuario en LocalStorage
- Valide la sesión desde el servidor
- Permita cerrar sesión correctamente
## Tecnologías utilizadas
- Angular Standalone Components
- .NET 8 Web API
- Entity Framework Core
- SQL Server
- Bootstrap 5
- JWT Token
- LocalStorage
## Arquitectura del sistema
Flujo de funcionamiento:
Angular Login → API .NET → Base de datos  
API valida credenciales → genera token → devuelve respuesta  
Angular guarda datos en LocalStorage → navega al Home  
Home envía token al backend → backend valida sesión  
## Funcionamiento del login
1. El usuario ingresa usuario y contraseña.
2. Angular envía las credenciales al endpoint `/api/Auth/login`.
3. El backend valida las credenciales en la base de datos.
4. Si son correctas:
   - genera token
   - devuelve usuario + token
5. Angular guarda los datos en LocalStorage.
6. Se redirige al Home.
7. El Home valida sesión consultando `/api/Auth/validate`.
## Datos almacenados en LocalStorage
El sistema guarda los siguientes valores:
- usuario → nombre del usuario autenticado  
- token → token de sesión generado por el backend  
Estos datos permiten mantener la sesión activa mientras el token sea válido.
## Endpoints implementados
Login  
POST `/api/Auth/login`
Validar sesión  
GET `/api/Auth/validate`
Cerrar sesión  
POST `/api/Auth/logout`
## Estructura del proyecto
## Frontend Angular
src/app
- login
- home
- app.routes.ts
- app.config.ts
## Backend .NET
- Controllers
- Models
- Data
- Program.cs
## Conclusión
El sistema desarrollado cumple satisfactoriamente con los objetivos planteados en la actividad, demostrando la implementación correcta de un mecanismo de autenticación simple entre cliente y servidor. Se evidencia el uso adecuado de tecnologías modernas, manejo de sesiones mediante tokens y persistencia de datos en el navegador, simulando el comportamiento de aplicaciones reales de autenticación web.
## Autor
Henry Álvarez
# Evidencia
<img width="1901" height="963" alt="image" src="https://github.com/user-attachments/assets/20ffba6c-2384-456c-afef-843e083dc7da" />
<img width="1913" height="960" alt="image" src="https://github.com/user-attachments/assets/74434578-9352-41f7-baaa-0f363fbabda2" />
<img width="1919" height="959" alt="image" src="https://github.com/user-attachments/assets/d62ee756-d720-4f62-a50b-7452f897d706" />




