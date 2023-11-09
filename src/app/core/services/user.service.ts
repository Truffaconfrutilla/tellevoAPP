import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore, DocumentData } from 'firebase/firestore';
import { User } from '../models/user.model';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { Router } from '@angular/router';



//guia ---> https://www.youtube.com/watch?v=HsQGfaY6LBc&list=PL9cZqOuuzAWln7QsiQhpPW7DN2K04MHrL&index=26 

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

@Injectable({
    providedIn: 'root',
})

export class UserService {
private firestoreDB;

constructor(
    public router: Router,
) {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
}

async registerUser(userData: User) {
    try {
    const docRef = collection(this.firestoreDB, "user");
    const doc = await addDoc(docRef, userData);

    console.log('Document added with ID: ', doc.id);
    } catch (error) {
    console.error('Error adding document: ', error);
    }
}

login(email: string, password: string) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.router.navigate(['home']);
        })
        .catch((error) => {
            console.error(error);
        });
}

logout() {
    try {
        const auth = getAuth();
        auth.signOut();
        console.log("SESION CERRADA:");
        } catch(error) {
            console.error("Error al cerrar sesion: ", error);
            }
        }
}