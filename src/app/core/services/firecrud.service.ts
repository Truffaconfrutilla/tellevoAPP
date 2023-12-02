import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class FirecrudService {
  constructor(private firestore: AngularFirestore) {}

  getCollection(name: string): AngularFirestoreCollection<User> {
    return this.firestore.collection<User>(name);
  }

  createUser(name: string, data: User): Promise<any> {
    return this.firestore.collection<User>(name).add(data);
  }

  updateUser(name: string, documentId: string, data: User): Promise<void> {
    return this.firestore.collection<User>(name).doc(documentId).update(data);
  }

  deleteUser(name: string, documentId: string): Promise<void> {
    return this.firestore.collection<User>(name).doc(documentId).delete();
  }

  getUserById(name: string, documentId: string): Observable<User | undefined> {
    return this.firestore.collection<User>(name).doc(documentId).valueChanges();
  }
}
