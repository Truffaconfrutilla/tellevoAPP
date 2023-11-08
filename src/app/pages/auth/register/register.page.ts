import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  constructor(
    public fb: FormBuilder,
    private router: Router,   
  ) {}

  ngOnInit() {}

  async register() {}
  
}  
