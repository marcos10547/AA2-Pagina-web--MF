# AA2: Cafetería - Gestión de Inventario y Proveedores

Este proyecto es una aplicación web completa (MERN stack adaptado a Vue/Postgres) para la gestión interna de una cafetería. Permite gestionar productos y proveedores de forma centralizada.

## 🚀 Requisitos previos
- Docker Desktop instalado.
- Git (opcional).

## 🛠 Entorno y Tecnologías
- **Frontend**: Vue 3 (Composition API), TypeScript, Vuetify 3, Pinia, Vue Router, VeeValidate + Yup.
- **Backend**: Node.js, Express, PostgreSQL.
- **Despliegue**: Docker & Docker Compose.

## 📦 Lanzamiento del Proyecto
Para arrancar toda la aplicación (Base de Datos + API + Frontend) de forma automática, simplemente ejecuta desde la raíz del proyecto:

```bash
docker-compose build
docker-compose up
```

Una vez levantados los contenedores:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)
- **DB**: PostgreSQL en el puerto 5432.

## 👤 Usuarios de Prueba
Para acceder a la parte de administración, utiliza estas credenciales:
- **Email**: `admin@cafeteria.com`
- **Contraseña**: `admin123`

*(Nota: Actualmente el login es visual. Para entrar a la administración directamente, pulsa el icono del engranaje en la cabecera).*

## 📖 Funcionalidades Implementadas
### Frontend
1. **Layouts Diferenciados**: Página pública, pantalla de login sin cabeceras/footers, y panel de administración con navegación propia.
2. **Gestión de Entidades**:
   - **Productos**: Listado detallado, creación, edición y borrado.
   - **Proveedores**: Gestión completa de contactos y categorías.
3. **Validación de Formularios**: Implementada con **VeeValidate** y **Yup** (reglas de campos obligatorios, formatos y valores positivos).
4. **Estado Centralizado**: Uso de **Pinia** con 3 stores independientes.
5. **Notificaciones**: Sistema de snackbars global (sin `alert` nativos).

### Backend
1. **API REST**: Endpoints para todas las operaciones CRUD.
2. **Persistencia**: Integración real con base de datos PostgreSQL.
3. **Contenedorización**: Todo el sistema está listo para funcionar en cualquier entorno mediante Docker.

---
**Desarrollado por**: Marcos (AA2 - Desarrollo Web)
**Metodología**: Gitflow (ramas feature/*)
