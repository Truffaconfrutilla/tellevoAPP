import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { User } from 'firebase/auth';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userList: User[] = [];
  loginForm: FormGroup;
  emailValue?: string;
  passwordValue?: string;
  user : any;
  langs: string[] = [];
  language!: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private translateService: TranslateService,
    
    ) {
      this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.email,this.customEmailValidator],
      ],
      password: ['',[Validators.required, Validators.minLength(6)]],
      });
      this.langs = this.translateService.getLangs();
    }

  ngOnInit() {
    
  }

  changeLang(event:any) {
    this.translateService.use(event.detail.value);
  }

  customEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email: string = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.cl')) {
      return { invalidEmail: true };
    }
    return null; 
  }

login() {     
  if (this.emailValue && this.passwordValue) {
      this.userService.login(this.emailValue, this.passwordValue);         
  }
}

  goToRegister() {
    this.router.navigate(['register']);
  }
}

