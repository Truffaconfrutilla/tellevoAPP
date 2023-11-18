import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('newPassword');
  const newPassword2 = control.get('newPassword2');

  if (!newPassword || !newPassword2 || newPassword.value === newPassword2.value) {
    return null; 
  }

  return { passwordMismatch: true };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordForm: FormGroup;
  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.passwordForm = this.formBuilder.group({
      actualPassword: ['',[Validators.required, Validators.minLength(6)]],
      newPassword: ['',[Validators.required , Validators.minLength(6)]],
      newPassword2: ['',[Validators.required , Validators.minLength(6)]],
    },
    {validators: passwordMatchValidator}
    );
  }

  ngOnInit() {}

  async changePassword(){
    this.userService.changePassword(this.passwordForm.get('actualPassword')?.value, this.passwordForm.get('newPassword')?.value)
  }
}
