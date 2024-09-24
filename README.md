# Proyecto Angular 18 con Tailwind CSS y Firebase

@HeiderHDev

Este proyecto utiliza Angular 18, Tailwind CSS para el diseño y Firebase para autenticación, almacenamiento y hosting. A continuación, se describen los pasos para la instalación y configuración.

## Requisitos previos

- **Node.js** v14 o superior
- **Angular CLI** instalado globalmente (`npm install -g @angular/cli`)
- **Firebase CLI** instalado globalmente (`npm install -g firebase-tools`)

## 1. Configuración de Angular 18

### Instalación

Si no tienes Angular instalado:

```bash
npm install -g @angular/cli
```

Crea un nuevo proyecto Angular:

```bash
ng new mi-proyecto
cd mi-proyecto
```

Esto creará una nueva aplicación Angular.

## 2. Configuración de Tailwind CSS

Tailwind CSS es un framework de utilidades para construir rápidamente interfaces personalizadas.

### Instalación de Tailwind

Sigue estos pasos para instalar Tailwind CSS en tu proyecto Angular:

1. Instala Tailwind y las dependencias requeridas:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. Configura Tailwind en el archivo `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. En tu archivo `src/styles.css`, importa Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Actualiza tu `angular.json` para asegurarte de que Tailwind compile correctamente:

```json
"styles": [
  "src/styles.css"
],
```

Ahora Tailwind CSS está configurado en tu proyecto Angular.

## 3. Configuración de Firebase

Firebase es una plataforma de desarrollo de aplicaciones que te permite implementar funcionalidades como autenticación, base de datos, almacenamiento y hosting.

### Instalación de Firebase CLI

Para usar Firebase, instala Firebase CLI si no lo tienes ya:

```bash
npm install -g firebase-tools
```

Inicia sesión en Firebase desde la CLI:

```bash
firebase login
```

### Instalación de AngularFire

AngularFire es una librería que facilita la integración de Firebase con Angular. Para agregarla a tu proyecto:

```bash
ng add @angular/fire
```

Esto instalará y configurará los servicios de Firebase en tu proyecto.

### Configuración de Firebase

1. **Crea un proyecto en Firebase**:  
   Ve a la [consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto.

2. **Configura Firebase en tu proyecto Angular**:  
   En el archivo `environment.ts` agrega tu configuración de Firebase que puedes obtener desde la consola de Firebase:

```ts
export const environment = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
  production: false,
};
```

3. **Inicializa Firebase en tu aplicación Angular**:  
   Abre tu archivo `app.module.ts` e importa los módulos de Firebase:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [...],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    // Otras importaciones
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Despliegue en Firebase Hosting

Firebase CLI facilita el despliegue de tu aplicación Angular en Firebase Hosting con un solo comando. Sigue estos pasos:

1. **Inicia Firebase Hosting**:  
   Conéctate a tu proyecto de Firebase:

   ```bash
   firebase init
   ```

   Durante este proceso:

   - Elige **Hosting**.
   - Selecciona tu proyecto Firebase.
   - Define la carpeta de publicación como `dist/mi-proyecto` (o el nombre de tu proyecto).

2. **Construye y despliega tu aplicación**:

   ```bash
   ng build --prod
   firebase deploy
   ```

   Esto desplegará tu aplicación Angular en Firebase Hosting.

## 4. Características de AngularFire

AngularFire te ofrece diversas características que simplifican la integración de Firebase en Angular:

- **Inyección de dependencias**: Los servicios de Firebase pueden ser inyectados en tus componentes y servicios.
- **Wrappers de Zone.js**: Permiten una funcionalidad más estable con service workers y SSR.
- **Observables basados en RxJS**: Trabaja con streams de datos en tiempo real utilizando RxJS.
- **API amigable con NgRx**: Facilita la integración con NgRx.
- **Lazy-loading**: AngularFire permite cargar Firebase de manera dinámica para mejorar el rendimiento.
- **Analíticas de Google**: Soporte nativo para el seguimiento con el Angular Router.
- **Guards de Router**: Protege tus rutas con autenticación de Firebase.
