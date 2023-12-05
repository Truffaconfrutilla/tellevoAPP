import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, DocumentSnapshot, DocumentData, query, where } from 'firebase/firestore';
import { Trip } from '../models/trip.model';

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

@Injectable({
    providedIn: 'root',
  })

export class TripService {
private firestoreDB;

constructor() {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
}

async getAllTrips(email: string): Promise<Trip[]> {
    const trips: Trip[] = [];
    try {
        const q = query(collection(this.firestoreDB, "trips"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        const tripData = doc.data() as Trip;
        trips.push(tripData);
        });

        return trips;
    } catch (error) {
        console.error('Error getting documents: ', error);
        return trips;
    }
}
}