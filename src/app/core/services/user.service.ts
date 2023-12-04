import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../config/firebase.config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, DocumentSnapshot, DocumentData, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { User } from '../models/user.model';
import { Location } from '../models/location.model';
import { RandomUserResponse } from '../models/randomUser.model';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';
import { MessageService } from 'src/app/core/services/message.service';


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
public userPlate: String = "";
public userLicence: String = "";
public isPartner: String = "";


constructor(
    public router: Router,
    private toastController: ToastController,
    private http: HttpClient,
    private locationService:LocationService,
    private message: MessageService,
) {
    // Initialize Firebase with your configuration
    const app = initializeApp(firebaseConfig);
    this.firestoreDB = getFirestore(app);
}


async registerUser(userData: User) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
    const user = userCredential.user;
    try {
        const docRef = collection(this.firestoreDB, "user");
        const doc = addDoc(docRef, userData);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('location', userData.location);
        this.router.navigate(['home']);
        this.messageToast(`Bienvenido a TellevoAPP, ${localStorage.getItem('name')} ଘ(੭˃ᴗ˂)੭`);
        } catch (error) {
        console.error('Error adding document: ', error);
        }
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    });
}

async addUser(userData: User) {
    const auth = getAuth();
    const currentUser = await this.getUserData()
    if (currentUser.administrator && currentUser.administrator === true){
        const docRef = collection(this.firestoreDB, "user");
        const doc = addDoc(docRef, userData);
        await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('email', currentUser.email);
        localStorage.setItem('password', currentUser.password);
        this.message.messageToast('success', 'Usuario ' + userData.name + ' agregado correctamente!', 2000, 'bottom');
        this.router.navigate(['/list']);
        })
    } else {
        const auth = getAuth();
        auth.signOut()
        this.router.navigate(['login']);
    }
}

reLogin(email: string, password: string){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {        
        console.error("Error:", error);
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
    auth.signOut();
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
            const q = query(collection(this.firestoreDB, "user"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            const id = querySnapshot.docs[0].id;
            const ref = doc(this.firestoreDB, "user", id)
            await updateDoc(ref, {
                password: password
            })
            const userData = await this.getUserData();
            localStorage.setItem('name', userData.name);
            localStorage.setItem('location', userData.location);
            this.router.navigate(['home']);
            this.messageToast(`Bienvenido a TellevoAPP, ${localStorage.getItem('name')} ଘ(੭˃ᴗ˂)੭`);
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
        localStorage.setItem('name', "");
        localStorage.setItem('location', "");
        const auth = getAuth();
        auth.signOut();
        this.router.navigate(['login']);
        this.messageToast("Sesión cerrada (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ");
    } catch(error) {
        console.error("Error al cerrar sesión: ", error);
    }
}

async changePassword(currentPassword: string, newPassword: string){
    const auth = getAuth();
    const user = auth.currentUser
    if (user?.email){
        const q = query(collection(this.firestoreDB, "user"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        const id = querySnapshot.docs[0].id;
        const ref = doc(this.firestoreDB, "user", id);
    
        signInWithEmailAndPassword(auth, user.email, currentPassword)
        .then(async (userCredential) => {
            const user = userCredential.user;
            if (user) {
                await updateDoc(ref, {
                    password: newPassword
                })
                updatePassword(user, newPassword)
                .then(() => {
                    localStorage.setItem('name', "");
                    localStorage.setItem('location', "");
                    const auth = getAuth();
                    auth.signOut();
                    this.router.navigate(['login']);
                })
                .catch((error) => {
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
    
    } else {
        this.router.navigate(['login']);
        console.error("Error al actualizar contraseña: el usuario no está autenticado");
    }
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

async isPartnerDriver(): Promise<boolean | null> {
    const user = await this.getUserData();
    if (user) {
        return user.partner;
    }
    return null;
}

async getUserPlate(){
    const user = await this.getUserData()
    if (user){
        return user.plate;
    };
    return null;
}

async getUserLicence(){
    const user = await this.getUserData()
    if (user){
        return user.licence;
    };
    return null;
}

async randomUser(locations: Location[]){
    const apiUrl = 'https://randomuser.me/api/?password=upper,lower,number,6-12';
    this.http.get<RandomUserResponse>(apiUrl).subscribe((data) => {
        if (data) {
            const randomUserData = data.results[0];
            const location = this.locationService.getRandomLocation(locations)
            const userData: User = {
                name: randomUserData.name.first + " " + randomUserData.name.last,
                email: randomUserData.email,
                administrator: false,
                partner: false,
                location: location.name,
                password: randomUserData.login.password
            }
            console.log(userData)
            console.log("email:", userData.email)
            console.log("password:",randomUserData.login.password)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userData.email, randomUserData.login.password)
            .then((userCredential) => {
                const user = userCredential.user;
                try {
                    const docRef = collection(this.firestoreDB, "user");
                    const doc =  addDoc(docRef, userData);
                }catch (error) {
                    console.error('Error adding document: ', error);
                }
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        }
    });
}

async generateRandomUsers(){
    const locations = await this.locationService.getAllLocations()
    for (let i = 0; i < 20; i++) {
        await this.randomUser(locations)
        await this.delay(2000);
    }
}

delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async listAllUsers(){
    const users: User[] = [];

    try {
        const usersCollection = collection(this.firestoreDB, 'user');
        const usersSnapshot = await getDocs(usersCollection);
    
        usersSnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        const userData = doc.data() as User;
        users.push(userData);
        });
    
    return users;
    } catch (error) {
        console.error('Error getting documents: ', error);
        return users;
    }
}

async deleteUser(email: string){
    const auth = getAuth();
    const currentUser = await this.getUserData()
    if (currentUser.administrator && currentUser.administrator === true){
    const q = query(collection(this.firestoreDB, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const snapshot = querySnapshot.docs[0];
    const data = <User>snapshot.data();
    const id = querySnapshot.docs[0].id;
    try {
        await deleteDoc(doc(this.firestoreDB, "user", id));
        this.messageToast(`Usuario eliminado ${email}`);

    } catch (error) {
        console.error('Error deleting documents: ', error);
    }
    localStorage.setItem('email', currentUser.email);
    localStorage.setItem('password', currentUser.password);
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
            deleteUser(user)
            .then(() => {
                this.router.navigate(['/list']);
            }).catch((error) => {
                console.log("Error:", error)
            });
        }
    })
    .catch((error) => {        
        console.error("Error:", error);
    });
    } else {
        const auth = getAuth();
        auth.signOut()
        this.router.navigate(['login']);
    }
    }
}