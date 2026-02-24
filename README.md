# 🏥 Bienestar Express - Sistema de Gestión Farmacéutica

**Bienestar Express** es una plataforma integral diseñada para la administración eficiente de inventarios farmacéuticos. Desarrollada con el stack MERN (MongoDB, Express, React, Node.js), ofrece una experiencia de usuario moderna, rápida y segura.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🚀 Características Principales

Este sistema no es solo un CRUD, incluye funcionalidades avanzadas:

- **🔐 Autenticación y Seguridad:** Sistema de Login/Registro con JWT. Protección de rutas y "Modo Lectura" para usuarios invitados.
- **📦 Gestión de Inventario:** Crear, Editar (con carga de imágenes), Eliminar y Visualizar productos.
- **🔍 Búsqueda y Filtrado Avanzado:** Buscador en tiempo real y filtros inteligentes (Stock crítico, Precio, Categoría).
- **📊 Reportes:** Exportación de inventario a CSV y opción de impresión nativa.
- **⚡ UX/UI Moderna:** Interfaz reactiva con Tailwind CSS, notificaciones Toast, Modals con Portals y Loaders personalizados.
- **📱 Diseño Responsivo:** Adaptable a móviles y escritorio.

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React + Vite:** Para una construcción rápida y optimizada.
- **Tailwind CSS:** Para un diseño moderno y responsive.
- **React Hot Toast:** Para notificaciones elegantes.
- **Custom Hooks:** Para el manejo del estado global y lógica reutilizable.

### Backend

- **Node.js + Express:** API RESTful robusta.
- **MongoDB Atlas:** Base de datos NoSQL en la nube.
- **Mongoose:** Modelado de datos.
- **JWT & Bcrypt:** Seguridad y encriptación.

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente.

### 1. Clonar el repositorio

```bash
git clone [https://github.com/Joshua-desings/Bienestar-Express.git](https://github.com/Joshua-desings/Bienestar-Express.git)
cd Bienestar-Express

```

### 2. Configurar el Backend (Servidor)

```bash
cd Backend
npm install

```

**⚠️ Importante:** Crea un archivo `.env` en la carpeta `/Backend` con las siguientes variables:

```env
PORT=5000
DB_URI=tu_string_de_conexion_mongodb_atlas
SECRET_KEY=tu_palabra_secreta_jwt

```

Para iniciar el servidor:

```bash
npm start
# O para desarrollo con nodemon:
npm run dev

```

### 3. Configurar el Frontend (Cliente)

Abre una nueva terminal y ve a la carpeta del frontend:

```bash
cd Frontend
npm install

```

**⚠️ Importante:** Crea un archivo `.env` en la carpeta `/Frontend`:

```env
VITE_API_URL=http://localhost:5000

```

Para iniciar la aplicación:

```bash
npm run dev

```

---

## 📄 Documentación y Diseño

Puedes ver el proceso de diseño UI/UX en nuestro Figma:

- [🎨 Ver Diseño en Figma](https://www.figma.com/file/8egjlThhBf3Q9sn1Ky4QKk/Farmacia-Bienestar-Express-S.A?type=design&node-id=7%3A170&mode=design&t=6kEDu9VI2dOnyJfD-1)

---

## 👤 Autor

Este proyecto fue desarrollado con ❤️ por:

- [@JoshuaFreelancer](https://github.com/JoshuaFreelancer) | 🔧 FullStack Developer
