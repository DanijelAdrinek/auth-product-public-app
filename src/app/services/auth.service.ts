import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable, switchMap, of } from 'rxjs';
import { User } from '../models';
import { User as FirebaseUser } from 'firebase/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<unknown>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.getUserById(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }


  isLoggedIn(): boolean {
    return !this.afAuth.currentUser;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.setToken(result.user?.refreshToken);
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.clearToken();
    this.router.navigate(['login']);
  }

  private setToken(token: string | undefined): void {
    if (token) {
      localStorage.setItem('jwtToken', token);
    }
  }

  private clearToken(): void {
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }
}