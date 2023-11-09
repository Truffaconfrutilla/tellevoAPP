import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';
import { User } from '../models/user.model';
import { FirestoreModule } from '@angular/fire/firestore';


//guia ---> https://www.youtube.com/watch?v=HsQGfaY6LBc&list=PL9cZqOuuzAWln7QsiQhpPW7DN2K04MHrL&index=26 

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

@Injectable({
    providedIn: 'root',
})

export class FirebaseService {
private firestoreDB;

constructor(
    public database: Firestore
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
}