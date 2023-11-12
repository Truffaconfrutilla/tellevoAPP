import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore, DocumentData } from 'firebase/firestore';
import { User } from '../models/user.model';
import { AuthErrorCodes, getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword   } from "firebase/auth";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';



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
    private toastController: ToastController,
) {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
}

async registerUser(userData: User, password: string) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, userData.email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    try {
        const docRef = collection(this.firestoreDB, "user");
        const doc = addDoc(docRef, userData);
        this.router.navigate(['home']);
        } catch (error) {
        console.error('Error adding document: ', error);
        }
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    });
}

async messageToast(screenMessage: string) {
    const toast = await this.toastController.create({
        message: screenMessage,
        duration: 2000,
        position: 'bottom'
    });
    toast.present()
}

async login(email: string, password: string) {    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['home']);
        this.messageToast("Bienvenido a TellevoAPP ଘ(੭˃ᴗ˂)੭");
        
    })
    .catch((error) => {
        if(
            error.code === AuthErrorCodes.INVALID_PASSWORD ||
            error.code === AuthErrorCodes.USER_DELETED                
        ){
            Swal.fire({
                icon: 'question',        
                title: 'Oops...',
                text: 'Segur@ que los datos estan bien?',
                heightAuto: false
            });
        }
        console.error("Error en el login", error, error.code);
    });
}

async checkLogin() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=> {
        if (user) {
            const uid = user.uid;            
        }else{
            this.router.navigate(['login']);
        }
    })
}

async logout() {
    try {
        const auth = getAuth();
        auth.signOut();
        console.log("SESION CERRADA");
        } catch(error) {
            console.error("Error al cerrar sesion: ", error);
            }
        }
}

