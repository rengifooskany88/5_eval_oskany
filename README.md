# Informe Técnico: Mini API - Tecno Servicios Machine

## Descripción del Proyecto
Aplicación web cliente-servidor desarrollada para gestionar el registro de clientes interesados en la venta y reparación de máquinas de coser de Tecno Servicios Machine, simulando persistencia de datos mediante archivos JSON.

## Tecnologías Utilizadas
* **Node.js & Express.js:** Entorno de ejecución y framework backend para la creación de rutas REST.
* **HTML5 & Vanilla JavaScript:** Interfaz de usuario dinámica con consumo de API vía `fetch()`.
* **File System (fs):** Módulo nativo de Node.js para la persistencia local en formato JSON.

## Estructura de Carpetas
Se organizó bajo un estándar modular separando las rutas (`/routes`), los datos simulados (`/data`), los recursos públicos del cliente (`/public`) y el punto de entrada principal (`server.js`).

## Flujo Completo de Datos
1. El usuario completa el formulario en `index.html`.
2. El script `main.js` intercepta el evento submit y envía un payload JSON mediante `fetch()` con método `POST` al endpoint `/clientes`.
3. El servidor valida la integridad y tipos de datos. Si es correcto, almacena el registro en `clientes.json` y genera una respuesta personalizada devuelta al cliente.
4. El frontend procesa la respuesta, muestra el mensaje dinámico y actualiza automáticamente la lista de historial mediante una petición `GET`.

## Validaciones Implementadas
* Verificación de campos obligatorios vacíos.
* Validación de que la edad sea un número entero positivo mayor a cero tanto en frontend como backend.

## Aprendizajes y Mejoras
* **Aprendizaje:** Consolidación de la comunicación asíncrona entre cliente y servidor mediante API REST y manipulación de archivos planos con Node.js.
* **Mejora:** Implementar una base de datos real (MongoDB o PostgreSQL) e incorporar un sistema de autenticación por tokens (JWT).
