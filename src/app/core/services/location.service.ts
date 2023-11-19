import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query ,DocumentSnapshot, DocumentData} from 'firebase/firestore';
import { Location } from '../models/location.model';

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

@Injectable({
    providedIn: 'root',
  })

export class LocationService {
private firestoreDB;

constructor() {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
}


async getAllLocations(): Promise<Location[]> {
    const locations: Location[] = [];

    try {
      const locationsCollection = collection(this.firestoreDB, 'locations');
      const locationsSnapshot = await getDocs(locationsCollection);

      locationsSnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        const locationData = doc.data() as Location;
        locations.push(locationData);
      });

      return locations;
    } catch (error) {
      console.error('Error getting documents: ', error);
      return locations;
    }
  }

  getRandomLocation(locations: Location[]) {
    const randomIndex = Math.floor(Math.random() * (locations.length - 1))
    return locations[randomIndex]
  }
}

