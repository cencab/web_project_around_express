# Tripleten web_project_around_express

## 1. Descripción del Proyecto y Funcionalidad

Esta es la API RESTful para la aplicación "Alrededor de los EE. UU.". El proyecto establece el backend completo de la aplicación, permitiendo la interacción con una base de datos real.

**Funcionalidades principales:**

- **Gestión de Usuarios:** Creación de usuarios, obtención de perfiles y actualización de información personal y avatar (manejando rutas GET, POST y PATCH).
- **Gestión de Tarjetas:** Creación y eliminación de tarjetas de lugares, vinculadas automáticamente al usuario creador (rutas GET, POST y DELETE).
- **Interactividad:** Sistema de "Me gusta" (Likes) para las tarjetas, permitiendo a los usuarios dar o quitar un like a una publicación específica (rutas PUT y DELETE).
- **Seguridad y Validación:** Manejo centralizado de errores (400, 404, 500) y validación estricta de esquemas de datos y URLs utilizando Expresiones Regulares (Regex).

## 2. Tecnologías y Técnicas Utilizadas

- **Node.js y Express.js:** Para la creación del servidor y la estructuración del enrutamiento.
- **MongoDB y Mongoose:** Como base de datos NoSQL y ODM (Object Data Modeling) para definir esquemas estrictos y realizar consultas eficientes mediante métodos como `.findByIdAndUpdate()`, `.orFail()` y operadores como `$addToSet` y `$pull`.
- **Arquitectura de Software:** Código modularizado separando claramente las responsabilidades en `routes`, `controllers` y `models`.
- **ESLint:** Configuración de reglas `airbnb-base` para mantener un estilo de código limpio y estandarizado.
