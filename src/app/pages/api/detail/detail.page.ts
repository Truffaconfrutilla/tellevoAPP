import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  detailForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.detailForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
  }
  );}

  ngOnInit() {
  }

  async detailUser(){
    this.validateData()
    this.user = await this.userService.getUserDetail(this.detailForm.get('email')?.value)
  }

  validateData(){    
    if (this.detailForm.invalid) {
      Swal.fire({
        icon: 'warning',
        iconColor: 'red',
        title: 'Oops...',
        text: 'Debes llenar todos los datos!',
        heightAuto: false,
      });
      return false;
    }
    return true
  }

}
