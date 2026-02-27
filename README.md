# AA2: Cafetería - Gestión de Inventario y Proveedores ☕️

Este proyecto es una aplicación web profesional de gestión para una cafetería, desarrollada con **Vue 3, TypeScript, Node.js y PostgreSQL**, totalmente contenerizada con Docker.

## � Despliegue Rápido
Para arrancar todo el ecosistema (DB + API + Web):

```bash
docker-compose build
docker-compose up
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)

## 👤 Acceso y Credenciales
Utiliza estos datos para entrar en el panel de administración:
- **Email**: `admin@cafeteria.com`
- **Password**: `admin123`

---

## 🛠 Tecnologías y Arquitectura
- **Frontend**: Vue 3 (Composition API), TypeScript, Vuetify 3 (Material Design), Pinia (4 stores), Vue Router, VeeValidate + Yup.
- **Backend**: Node.js, Express, PostgreSQL, JWT, Bcrypt.
- **Infraestructura**: Docker & Docker Compose.

---

## ✅ Requisitos Cumplidos (Sección 5)
1. **Vistas**: Home Pública, Login/Registro, Dashboard Admin, CRUD de Productos, CRUD de Proveedores.
2. **Gestión Total (CRUD)**: Creación, lectura, actualización y borrado real en base de datos.
3. **Validación**: Formularios blindados con VeeValidate y Yup.
4. **Estado Centralizado**: 4 stores de Pinia gestionando Negocio, UI y Auth.
5. **Componentización**: Uso de layouts, componentes de lista independientes (`v-for` separado del diseño) y componentes de UI global.
6. **No Alerts**: Uso exclusivo de Snackbars de Vuetify.

## 🌟 Funcionalidades Extra (Puntos para el 10)
1. **Autenticación Real (Real Login/Register)**:
   - Registro con encriptación **Bcrypt**.
   - Login con tokens **JWT**.
   - **Router Guards**: Protección de rutas administrativas en el cliente.
2. **Internacionalización (i18n)**: 
   - Soporte completo para **Español (ES)** e **Inglés (EN)**.
   - Cambio de idioma en caliente sin recarga.
3. **Temas Visuales (Theming)**:
   - Alternancia entre **Modo Claro (Light)** y **Modo Oscuro (Dark)** instantánea.

---
**Desarrollado por**: Marcos (AA2 - Desarrollo Web)
**Repositorio**: [https://github.com/marcos10547/AA2-Pagina-web--MF](https://github.com/marcos10547/AA2-Pagina-web--MF)
