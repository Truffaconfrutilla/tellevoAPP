import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, DocumentSnapshot, DocumentData, query, where, addDoc } from 'firebase/firestore';
import { Trip } from '../models/trip.model';
import { Router } from '@angular/router';

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

@Injectable({
    providedIn: 'root',
  })

export class TripService {
private firestoreDB;


constructor(public router: Router,) {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
    
}

async getAllStundetTrips(email: string): Promise<Trip[]> {
    const trips: Trip[] = [];
    try {
        const q = query(collection(this.firestoreDB, "trips"), where("studentEmail", "==", email));
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

async getAllPartnerTrips(email: string): Promise<Trip[]> {
    const trips: Trip[] = [];
    try {
        const q = query(collection(this.firestoreDB, "trips"), where("partnerEmail", "==", email));
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



async startTrip(originAddress: string, originLat: number, originLng: number, destinationAddress: string, destinationLat: number, destinationLng: number, studentEmail: string, studentName: string){
    const tripData: Trip ={
      partnerEmail: "carlitoslechuga@duocuc.cl",
      partnerName: "Carlitos Lechuga",
      studentName: studentName,
      studentEmail: studentEmail,
      origin: {
          address: originAddress,
          lat: originLat,
          long: originLng,
      },
      destination: {
          address: destinationAddress,
          lat: destinationLat,
          long: destinationLng,
      }
    }
    
    console.log(tripData)
    try {
      const docRef = collection(this.firestoreDB, "trips");
      const doc =  await addDoc(docRef, tripData);
      this.router.navigate(['/google-maps']);
    } catch (error) {
      console.log(error)
    }

  }
}