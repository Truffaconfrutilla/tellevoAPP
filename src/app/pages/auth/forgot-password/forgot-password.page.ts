import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  resetForm: FormGroup;
  langs: string[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
    });
    this.langs = this.translateService.getLangs();
  }

  ngOnInit() {
  }

  resetPassword(){
    this.userService.resetPassword(this.resetForm.get('email')?.value)
  }

}
