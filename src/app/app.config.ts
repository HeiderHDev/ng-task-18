import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-task-18-c304f',
        appId: '1:743076476337:web:a88c5ba463d59ad5a07990',
        storageBucket: 'ng-task-18-c304f.appspot.com',
        apiKey: 'AIzaSyBfHNrZpj4t5DaXHLr9u6NDuzSLrv6vKP8',
        authDomain: 'ng-task-18-c304f.firebaseapp.com',
        messagingSenderId: '743076476337',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
