import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        projectId: "angular-auth-product-app",
        appId: "1:982643213649:web:6c9a33956a090411683f70",
        storageBucket: "angular-auth-product-app.appspot.com",
        apiKey: "AIzaSyC0bydiWKiShqhr7dNpg8W9-gCk__pGaa4",
        authDomain: "angular-auth-product-app.firebaseapp.com",
        messagingSenderId: "982643213649",
        measurementId: "G-J9ZWL4R8E7"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    importProvidersFrom(ReactiveFormsModule),
    AuthService
  ]
};