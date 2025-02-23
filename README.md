# 🌡️ Monitoreo de Temperatura en Tiempo Real

## 🚀 Introducción

**Monitoreo Temperatura** es una aplicación web dinámica diseñada para monitorear la temperatura en tiempo real. Permite registrar usuarios, visualizar gráficos interactivos actualizados en vivo, recibir alertas automáticas por correo electrónico cuando la temperatura supera límites predefinidos y próximamente permitirá descargar informes en formato PDF.

## ⚙️ Tecnologías Utilizadas

- **Frontend**: React.js (con Vite), Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, Socket.IO, Nodemailer
- **Base de Datos**: Almacenamiento en memoria (NoSQL)

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (incluye npm)
- **Git** (opcional pero recomendado)

## 🛠️ Instalación del Proyecto

### 🔹 1. Clonar el Repositorio

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/tu-usuario/monitoreo-temperatura.git
cd monitoreo-temperatura
```

Si tienes un archivo `.zip`, simplemente extrae la carpeta en tu computadora.

### 🔹 2. Configurar el Backend

Navega a la carpeta del backend:

```bash
cd backend
```

Instala las dependencias necesarias:

```bash
npm install
```

Dependencias principales:
- axios
- bcrypt
- cors
- express
- jsonwebtoken
- nodemailer
- pg
- socket.io


Inicia el servidor backend:

```bash
node server.js
```

El servidor se ejecutará en [http://localhost:5000](http://localhost:5000).

### 🔹 3. Configurar el Frontend

Abre otra terminal y dirígete al frontend:

```bash
cd ../frontend
```

Instala las dependencias:

```bash
npm install
```

Dependencias principales:
- axios
- chart.js
- chartjs-plugin-annotation
- react
- react-chartjs-2
- react-router-dom
- socket.io-client

Dependencias de desarrollo:
- @eslint/js
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- autoprefixer
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- postcss
- tailwindcss
- vite

Inicia la aplicación frontend:

```bash
npm run dev
```

La aplicación frontend estará disponible en [http://localhost:5173](http://localhost:5173).

## 🎯 Uso de la Aplicación

### 🔸 Registro e Inicio de Sesión

- Accede a [http://localhost:5173](http://localhost:5173)
- Regístrate o inicia sesión con tus credenciales.

### 🔸 Visualización en Tiempo Real

- Al autenticarte, podrás visualizar gráficos actualizados en tiempo real sobre la temperatura.

### 🔸 Alertas Automáticas

- Recibirás un correo electrónico automáticamente cuando la temperatura supere el umbral definido.

### 🔸 Próximamente: Descarga de Reportes en PDF

- Muy pronto podrás descargar informes detallados en formato PDF con datos históricos.

## ❗ Solución de Problemas Comunes

- **Error de módulo faltante**: Ejecuta `npm install` tanto en backend como en frontend.
- **Backend no responde**: Verifica que el puerto 5000 esté libre y el servidor backend esté iniciado con `npm start`.
- **Frontend no carga**: Asegúrate de que el backend esté activo antes de iniciar el frontend.

## 📩 Contacto y Contribución

¡Tus contribuciones son bienvenidas! Si deseas mejorar el proyecto o tienes dudas, por favor:

- 📧 **Email**: [ivan.mejiasm@gmail.com](mailto:ivan.mejiasm@gmail.com)
- 🔗 **GitHub**: Crea un issue en GitHub para cualquier problema o sugerencia.

---

¡Gracias por usar **Monitoreo Temperatura**! 🌡️🚀

