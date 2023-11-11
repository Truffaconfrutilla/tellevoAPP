import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {}

  login(){
    this.userService.login("ro.sanhueza@duocuc.cl","Hola123")
  }
  register() {
    this.router.navigate(['register']);
  }
}
