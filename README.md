# 🂡 Poker Tracker - Guía de Instalación Completa

Sistema profesional de puntuaciones para partidas de poker entre amigos.

## 📋 Requisitos Previos

- Una cuenta de Gmail (para Firebase)
- Una cuenta de GitHub (gratis)
- Una cuenta de Vercel (gratis, se crea con GitHub)

---

## 🚀 PASO 1: Configurar Firebase (Base de Datos Gratis)

### 1.1 Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Nombre del proyecto: `poker-tracker` (o el que quieras)
4. **DESHABILITA** Google Analytics (no lo necesitas)
5. Haz clic en **"Crear proyecto"**

### 1.2 Crear Base de Datos Realtime

1. En el menú lateral, ve a **"Build"** → **"Realtime Database"**
2. Haz clic en **"Crear base de datos"** o **"Create database"**
3. Ubicación: Elige la más cercana a tu país (ejemplo: `us-central1`)
4. Modo de seguridad: Selecciona **"Iniciar en modo de prueba"** (Start in test mode)
5. Haz clic en **"Habilitar"** o **"Enable"**

### 1.3 Configurar Reglas de Seguridad

1. Ve a la pestaña **"Reglas"** (Rules)
2. Reemplaza TODO el contenido con esto:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. Haz clic en **"Publicar"** o **"Publish"**

⚠️ **NOTA**: Estas reglas permiten lectura/escritura pública. Para mayor seguridad, después puedes implementar autenticación.

### 1.4 Obtener Configuración de Firebase

1. En el menú lateral, haz clic en el ícono de engrane ⚙️ → **"Configuración del proyecto"**
2. Baja hasta **"Tus apps"** (Your apps)
3. Haz clic en el ícono **</>** (Web)
4. Nombre de la app: `Poker Tracker Web`
5. **NO** marques Firebase Hosting
6. Haz clic en **"Registrar app"**
7. Verás un código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "poker-tracker-xxxxx.firebaseapp.com",
  databaseURL: "https://poker-tracker-xxxxx-default-rtdb.firebaseio.com",
  projectId: "poker-tracker-xxxxx",
  storageBucket: "poker-tracker-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

8. **COPIA ESTOS VALORES** (los necesitarás en el PASO 3)

---

## 🐙 PASO 2: Subir el Código a GitHub

### 2.1 Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** arriba a la derecha → **"New repository"**
3. Nombre del repositorio: `poker-tracker`
4. Selecciona **"Public"** (público)
5. **NO** marques "Add a README file"
6. Haz clic en **"Create repository"**

### 2.2 Subir los Archivos

**Opción A - Usar GitHub Desktop (MÁS FÁCIL):**

1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. Inicia sesión con tu cuenta
3. Arrastra la carpeta `vercel-poker` completa a GitHub Desktop
4. Escribe un mensaje: "Initial commit"
5. Haz clic en **"Commit to main"**
6. Haz clic en **"Publish repository"**

**Opción B - Usar la Terminal:**

1. Abre la terminal en la carpeta `vercel-poker`
2. Ejecuta estos comandos (reemplaza `TU_USUARIO` con tu usuario de GitHub):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/poker-tracker.git
git push -u origin main
```

---

## 🔧 PASO 3: Configurar Firebase en el Código

1. Abre el archivo `src/firebase.js` en cualquier editor de texto
2. Reemplaza TODO el contenido de `firebaseConfig` con los valores que copiaste en el PASO 1.4:

**ANTES:**
```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  // ...
};
```

**DESPUÉS:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "poker-tracker-xxxxx.firebaseapp.com",
  databaseURL: "https://poker-tracker-xxxxx-default-rtdb.firebaseio.com",
  projectId: "poker-tracker-xxxxx",
  storageBucket: "poker-tracker-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

3. **GUARDA EL ARCHIVO**
4. Sube los cambios a GitHub:
   - GitHub Desktop: Commit + Push
   - Terminal: `git add . && git commit -m "Add Firebase config" && git push`

---

## 🚀 PASO 4: Desplegar en Vercel (GRATIS)

### 4.1 Crear Cuenta en Vercel

1. Ve a [Vercel](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza Vercel para acceder a tu GitHub

### 4.2 Importar el Proyecto

1. En el dashboard de Vercel, haz clic en **"Add New..."** → **"Project"**
2. Busca tu repositorio `poker-tracker`
3. Haz clic en **"Import"**
4. **NO CAMBIES NADA** en la configuración
5. Haz clic en **"Deploy"**

### 4.3 Esperar el Despliegue

- Vercel instalará las dependencias y construirá tu app
- Toma entre 1-3 minutos
- Verás un mensaje de **"Congratulations!"** cuando termine

### 4.4 Obtener tu URL

1. Verás una URL como: `https://poker-tracker-xxxxxx.vercel.app`
2. **¡ESE ES TU ENLACE!** Cópialo y compártelo con tus amigos

---

## 🎮 PASO 5: ¡Usar la Aplicación!

### Para tus amigos (solo ver):
- Envíales el enlace: `https://poker-tracker-xxxxxx.vercel.app`
- Pueden ver la tabla en tiempo real
- NO pueden editar nada

### Para ti (administrador):
1. Abre el enlace
2. Ingresa la contraseña: `poker2025`
3. Ya puedes editar puntuaciones, agregar jugadores, etc.

---

## 🔐 Cambiar la Contraseña de Admin

1. Abre `src/App.jsx`
2. Busca la línea 18:
```javascript
const ADMIN_PASSWORD = 'poker2025';
```
3. Cambia `'poker2025'` por tu contraseña
4. Guarda y sube a GitHub
5. Vercel desplegará automáticamente

---

## 🎨 Personalizar Colores

En `src/App.jsx`, busca y reemplaza:

- **Fondo verde**: `from-green-900 via-green-800 to-gray-900`
- **Amarillo/dorado**: `yellow-600`, `yellow-400`, `yellow-500`
- **Bordes**: `border-yellow-600`

Colores disponibles en Tailwind: blue, red, purple, pink, indigo, teal, etc.

---

## ❓ Solución de Problemas

### La app no carga / Error de Firebase
✅ Verifica que copiaste TODA la configuración de Firebase correctamente
✅ Asegúrate de que las reglas de Firebase estén en modo público

### No puedo editar nada
✅ Verifica que ingresaste la contraseña correcta
✅ La contraseña por defecto es `poker2025`

### Los datos no se guardan
✅ Revisa que tu base de datos de Firebase esté activa
✅ Verifica las reglas de seguridad en Firebase Console

---

## 📞 Soporte

Si tienes problemas:
1. Revisa que completaste todos los pasos
2. Verifica que los archivos estén en GitHub correctamente
3. Revisa los logs en Vercel (pestaña "Deployments")

---

## ✨ Características

✅ Tabla de puntuaciones en tiempo real
✅ Agregar/eliminar jugadores
✅ Agregar/eliminar fechas
✅ Edición de puntuaciones con un clic
✅ Ordenamiento automático por puntaje
✅ Almacenamiento en la nube (Firebase)
✅ Gratis para siempre
✅ Funciona en móviles y PC
✅ Tus amigos pueden verlo sin instalar nada

---

## 🎉 ¡Listo!

Tu sistema de poker está en línea. Comparte el enlace con tus amigos y disfruta. 🂡 🂱 🃁 🃑
"# PuntosPoker-Intelectual" 
"# PuntosPoker-Intelectual" 
