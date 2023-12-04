import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  deleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.deleteForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
    }
    );
  }

  ngOnInit() {
  }

  validateData(){    
    if (this.deleteForm.invalid) {
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

  deleteUser(){
    if (this.validateData()){
      this.userService.deleteUser(this.deleteForm.get('email')?.value)
    }
  }

}
