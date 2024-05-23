import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath = '/users';

  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<User[]> {
    return this.db.list<User>(this.basePath).valueChanges();
  }

  addUser(user: User) {
    return this.db.list(this.basePath).push(user);
  }
}