# Tripleten web_project_around_express

## Descripción del Proyecto y Funcionalidad

Este proyecto representa la primera etapa en el desarrollo del backend para la aplicación web "Alrededor de los EE. UU.". El objetivo principal es construir un servidor local utilizando Express.js que actúe como una API para servir datos en formato JSON a la aplicación frontend.

En esta fase de desarrollo, el servidor maneja el enrutamiento básico simulando una base de datos mediante la lectura de archivos físicos. Las funcionalidades principales incluyen:

- **Enrutamiento de Colecciones:** Rutas base `/users` y `/cards` que devuelven el conjunto completo de datos.
- **Enrutamiento Dinámico:** Búsqueda de usuarios específicos mediante parámetros de URL (`/users/:id`).
- **Manejo de Errores:** Respuestas estructuradas con códigos de estado HTTP correspondientes (404 para recursos inexistentes y 500 para errores internos).
- **Lectura Asíncrona:** Integración de los módulos `fs` y `path` para una lectura segura de los archivos de datos JSON independientemente del sistema operativo.

## Tecnologías y Técnicas Utilizadas

- **Node.js**: Entorno de ejecución para la lógica del servidor.
- **Express.js**: Framework para la creación del servidor y arquitectura de enrutamiento modular (`express.Router()`).
- **ESLint**: Herramienta de linting configurada estrictamente con la guía de estilo de **Airbnb** para asegurar la calidad, legibilidad y consistencia del código.
- **Nodemon**: Dependencia de desarrollo para habilitar el _hot reload_ y agilizar las pruebas.
