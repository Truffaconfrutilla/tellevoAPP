import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userList: User[] = [];
  loginForm: FormGroup;
  user: any;
  emailValue?: string;
  passValue?: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    
    ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
    }

  ngOnInit() {
//aqui va el checklogin
  }
/*
  login(){
    this.userService.login("ro.sanhueza@duocuc.cl","Hola123")
  }
 */

  async mesaggeToast(screenMessage: string) {
    const toast = await this.toastController.create({
      message: screenMessage,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }

  login() {
    if(this.emailValue && this.passValue){
      this.userService.login(this.emailValue, this.passValue);
      this.mesaggeToast("Bienvenido a TellevoAPP ଘ(੭˃ᴗ˂)੭")
    }
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}

