import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs  } from 'firebase/firestore';
import { User } from '../models/user.model';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, sendPasswordResetEmail  } from "firebase/auth";
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
public userName: String = "";
public userEmail: String = "";


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
    .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
            await this.getUserName(); 
            this.router.navigate(['home']);
            this.messageToast(`Bienvenido a TellevoAPP, ${this.userName} ଘ(੭˃ᴗ˂)੭`);
        }
    })
    .catch((error) => {        
        console.error("Usuario o correo inválido", error);{
            Swal.fire({
                icon: 'question',        
                title: 'Oops...',
                text: 'Segur@ que los datos están bien?',
                heightAuto: false
            });
        }
    });
}


async checkLogin() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=> {
        if (user) {
        }else{
            this.router.navigate(['login']);
        }
    })
}

async logout() {
    try {
        const auth = getAuth();
        auth.signOut();
        this.messageToast("Sesión cerrada (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ");
    } catch(error) {
        console.error("Error al cerrar sesión: ", error);
    }
}

async changePassword(currentPassword: string, newPassword: string){
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=> {
        if (user?.email) {
            signInWithEmailAndPassword(auth, user.email, currentPassword)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user) {
                    updatePassword(user, newPassword).then(() => {
                        this.router.navigate(['login']);
                    }).catch((error) => {
                        console.error("Error al actualizar contraseña: ", error);
                    });
                }
            })
            .catch((error) => {        
                console.error("Usuario o correo inválido", error);{
                    Swal.fire({
                        icon: 'question',        
                        title: 'Oops...',
                        text: 'Contraseña actúal no es correcta.',
                        heightAuto: false
                    });
                }
            });
        }else{
            this.router.navigate(['login']);
            console.error("Error al actualizar contraseña: el usuario no está autenticado");
        }
    })
}

async resetPassword(email: string) {
    const auth = getAuth();

    const q = query(collection(this.firestoreDB, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0){
        sendPasswordResetEmail(auth, email)
        .then(() => {
            this.router.navigate(['login']);
            this.messageToast(`Correo enviado a ${email} ଘ(੭˃ᴗ˂)੭`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    } else {
        Swal.fire({
            icon: 'question',        
            title: 'Oops...',
            text: 'Correo no existe en nuestra APP.',
            heightAuto: false
        });
    }

    
}



async getUserData(){
    const auth = getAuth();
    const user = auth.currentUser
    if (user !== null) {
        const email = user.email;
        if (email !== null){
            try {
            const q = query(collection(this.firestoreDB, "user"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            const snapshot = querySnapshot.docs[0];
            const data = <User>snapshot.data();
            return data
            } catch (error) {
                return null
            }
        }
    }
    return null
}

async getUserName(){
    const user = await this.getUserData()
    if (user){
        this.userName = user?.name
    }
} 

async getUserEmail(){
    const user = await this.getUserData()
    if (user){
        return user.email || null
    };
    return null;
}

}