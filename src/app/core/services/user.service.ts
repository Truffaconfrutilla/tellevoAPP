import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';
import { User } from '../models/user.model';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';



//guia ---> https://www.youtube.com/watch?v=HsQGfaY6LBc&list=PL9cZqOuuzAWln7QsiQhpPW7DN2K04MHrL&index=26 

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

@Injectable({
    providedIn: 'root',
})

export class FirebaseService {
private firestoreDB;

constructor(
    public database: Firestore,
    private auth: AngularFireAuth,
    public router: Router,
) {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
}

async registerUser(userData: User) {
    try {
    // Reference the collection you want to add the document to
    const docRef = collection(this.firestoreDB, "user");

    // Add the JSON data as a new document
    const doc = await addDoc(docRef, userData);

    console.log('Document added with ID: ', doc.id);
    } catch (error) {
    console.error('Error adding document: ', error);
    }
}

async login(email: string , pass: string){
    try{
        const user = await this.auth.signInWithEmailAndPassword(email,pass);
        console.log("Se inició sesión de:" + user);
        if (user){
            this.router.navigate(['/home']);
        }
    };
}


checkLogin() {
    return new Promise((resolve, reject)=> {
        this.auth.onAuthStateChanged((user)=> {
            resolve(user);
        }, (error)=> {
            reject(error)
        });
    });
}

async logout() {
    try {
        await this.auth.signOut();
        console.log("SESION CERRADA:");
        } catch(error) {
            console.error("Error al cerrar sesion: ", error);
            }
        }
        



}