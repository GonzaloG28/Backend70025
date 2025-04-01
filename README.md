# Backend70025

Backend70025 es una API backend en JavaScript diseñada para gestionar usuarios y sesiones de manera eficiente. Ofrece autenticación segura, manejo de sesiones y una integración sencilla con bases de datos y servicios externos.

## Funcionalidades

- **Autenticación y Autorización**: Implementa autenticación con JWT y soporte para autenticación con GitHub.
- **Gestión de Usuarios**: Permite el registro, inicio de sesión y administración de usuarios.
- **Sesiones Seguras**: Manejo de sesiones con autenticación basada en cookies y tokens.
- **Base de Datos**: Integración con MongoDB para almacenamiento de usuarios y datos de sesión.
- **Manejo de Errores**: Sistema de validaciones para garantizar la seguridad de la API.

## Variables de Entorno

Para ejecutar este proyecto, necesitas configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

```env
PORT=3000  # Puerto donde se ejecutará la API
MONGO_URL=  # URL de conexión a MongoDB
SECRET=  # Clave secreta para el middleware de autenticación JWT
DB_NAME=  # Nombre de la base de datos en MongoDB
APP_ID=  # ID de la aplicación para integración externa
CLIENT_ID=  # ID del cliente para autenticación con GitHub
CLIENT_SECRET=  # Clave secreta del cliente de GitHub

```
## Autor

[GonzaloG28](https://github.com/GonzaloG28)

