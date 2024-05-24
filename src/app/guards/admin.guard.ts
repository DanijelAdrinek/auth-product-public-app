import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      switchMap((user: any) => {
        if (user && user.uid) {
          return this.firestore.doc(`users/${user.uid}`).valueChanges().pipe(
            first(),
            map((userDoc: any) => {
              if (userDoc && userDoc.role === 'admin') {
                return true;
              } else {
                this.router.navigate(['/dashboard']);
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/dashboard']);
          return of(false);
        }
      })
    );
  }
}