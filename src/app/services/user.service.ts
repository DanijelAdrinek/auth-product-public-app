import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User> | null = null;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
  }

  getUsers(): Observable<User[]> {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUserById(id: string): Observable<User | undefined> {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.userDoc.valueChanges();
  }

  addUser(user: User): Promise<void> {
    const id = this.afs.createId();
    return this.usersCollection.doc(id).set(user);
  }

  updateUser(id: string, user: User): Promise<void> {
    return this.usersCollection.doc(id).update(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }

  updateAdminStatus(id: string, isAdmin: boolean): Promise<void> {
    return this.usersCollection.doc(id).update({ isAdmin });
  }
}