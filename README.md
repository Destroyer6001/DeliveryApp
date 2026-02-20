📦 Aplicación de Gestión de Pedidos

Aplicación móvil desarrollada con Ionic 8 y Angular 20, enfocada en la gestión eficiente de pedidos de entrega, liquidaciones y órdenes pendientes.

La aplicación utiliza componentes standalone, arquitectura moderna y almacenamiento local con Ionic Storage para una experiencia rápida y optimizada.

🚀 Características

✅ Arquitectura basada en componentes standalone

📦 Gestión de pedidos de entrega

🧾 Generación de liquidaciones

🗂 Administración de órdenes pendientes

💾 Persistencia de datos con Ionic Storage

🔐 Gestión de sesión de usuario

📱 Diseño responsive y adaptable

🔄 Navegación mediante Angular Router

🎨 UI moderna con componentes de Ionic

📲 Compatible con iOS y Android mediante Capacitor

🛠 Tecnologías Utilizadas

Ionic Framework 8.x

Angular 20.x

TypeScript 5.x

Ionic Storage

Capacitor 5.x

Node.js 18+

Ionic CLI

📋 Prerrequisitos
1️⃣ Node.js 18 o superior
node --version

2️⃣ npm 9+ o yarn
npm --version
# o
yarn --version

3️⃣ Ionic CLI
npm install -g @ionic/cli
ionic --version

4️⃣ Git
git --version

⚙️ Configuración del Entorno
1️⃣ Clonar el Repositorio
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
cd nombre-del-proyecto

2️⃣ Instalar Dependencias
npm install
# o
yarn install

3️⃣ Ejecutar en Navegador (Modo Desarrollo)
ionic serve


Modo laboratorio (simulación de dispositivos):

ionic serve --lab

4️⃣ Ejecutar en Dispositivo o Emulador
iOS
ionic capacitor run ios

Android
ionic capacitor run android

🏗 Arquitectura del Proyecto

La aplicación está construida bajo el enfoque de Standalone Components, eliminando la necesidad de módulos tradicionales (NgModule).

Características de la arquitectura:

Componentes independientes

Lazy loading optimizado

Servicios desacoplados

Manejo de estado simplificado

Persistencia local con Ionic Storage

💾 Persistencia de Datos

La aplicación utiliza Ionic Storage para:

Mantener la sesión del usuario

Guardar pedidos generados

Almacenar liquidaciones

Persistir datos incluso después de cerrar la aplicación

📱 Funcionalidades Principales
📦 Órdenes Pendientes

Permite visualizar y gestionar órdenes disponibles para generar pedidos de entrega.

🚚 Pedidos de Entrega

Creación y administración de pedidos activos y completados.

🧾 Liquidaciones

Generación de liquidaciones a partir de pedidos completados.

🔐 Gestión de Sesión

La aplicación incluye:

Inicio y cierre de sesión

Limpieza de almacenamiento al cerrar sesión

Protección básica de rutas

📂 Estructura Base
src/
 ├── app/
 │   ├── pages/
 │   ├── components/
 │   ├── services/
 │   └── guards/
 ├── assets/
 └── theme/

📦 Build para Producción
ionic build --prod


Luego sincronizar con Capacitor:

ionic capacitor sync

🧑‍💻 Autor

Juan Felipe Areiza Ocampo
Desarrollador de Software

📄 Licencia

Proyecto desarrollado con fines educativos y demostrativos.
