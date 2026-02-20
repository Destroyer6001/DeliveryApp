# 📦 Aplicación de Gestión de Pedidos

Aplicación móvil desarrollada con **Ionic 8** y **Angular 20**, enfocada en la gestión eficiente de pedidos de entrega, órdenes pendientes y liquidaciones.

La aplicación implementa **componentes standalone** y utiliza **Ionic Storage** para la persistencia de datos locales, ofreciendo una arquitectura moderna, ligera y escalable.

---

## 🚀 Características

- ✅ Arquitectura basada en componentes standalone  
- 📦 Gestión de pedidos de entrega  
- 🗂 Administración de órdenes pendientes  
- 🧾 Generación de liquidaciones  
- 💾 Persistencia de datos con Ionic Storage  
- 🔐 Gestión de sesión de usuario  
- 📱 Diseño responsive y adaptable  
- 🔄 Navegación con Angular Router  
- 🎨 UI moderna con componentes Ionic  
- 📲 Compatible con iOS y Android mediante Capacitor  

---

## 🛠 Tecnologías Utilizadas

- Ionic Framework 8.x  
- Angular 20.x  
- TypeScript 5.x  
- Ionic Storage  
- Capacitor 5.x  
- Node.js 18+  
- Ionic CLI  

---

## 📋 Prerrequisitos

### 1. Node.js 18 o superior

```bash
node --version
```

### 2. npm 9+ o yarn

```bash
npm --version
# o
yarn --version
```

### 3. Ionic CLI

```bash
npm install -g @ionic/cli
ionic --version
```

### 4. Git

```bash
git --version
```

---

## ⚙️ Configuración del Entorno

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
cd nombre-del-proyecto
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Ejecutar en Navegador (Modo Desarrollo)

```bash
ionic serve
```

Modo laboratorio:

```bash
ionic serve --lab
```

### 4. Ejecutar en Dispositivo o Emulador

#### iOS

```bash
ionic capacitor run ios
```

#### Android

```bash
ionic capacitor run android
```

---

## 🏗 Arquitectura del Proyecto

La aplicación está construida utilizando **Standalone Components**, eliminando la necesidad de módulos tradicionales (`NgModule`).

Características de la arquitectura:

- Componentes independientes  
- Lazy loading optimizado  
- Servicios desacoplados  
- Manejo de estado simplificado  
- Persistencia local con Ionic Storage  

---

## 💾 Persistencia de Datos

La aplicación utiliza Ionic Storage para:

- Mantener la sesión del usuario  
- Guardar pedidos generados  
- Almacenar liquidaciones  
- Persistir datos incluso después de cerrar la aplicación  

---

## 📱 Funcionalidades Principales

### 📦 Órdenes Pendientes  
Permite visualizar y gestionar órdenes disponibles para generar pedidos de entrega.

### 🚚 Pedidos de Entrega  
Creación y administración de pedidos activos y completados.

### 🧾 Liquidaciones  
Generación de liquidaciones a partir de pedidos completados.

---

## 🔐 Gestión de Sesión

Incluye:

- Inicio y cierre de sesión  
- Limpieza de almacenamiento al cerrar sesión  
- Protección básica de rutas  

---

## 📂 Estructura Base

```
src/
 ├── app/
 │   ├── pages/
 │   ├── components/
 │   ├── services/
 │   └── guards/
 ├── assets/
 └── theme/
```

---

## 📦 Build para Producción

```bash
ionic build --prod
```

Luego sincronizar con Capacitor:

```bash
ionic capacitor sync
```

---

## 🧑‍💻 Autor

Juan Felipe Areiza Ocampo  
Desarrollador de Software  

---

## 📄 Licencia

Proyecto desarrollado con fines educativos y demostrativos.
