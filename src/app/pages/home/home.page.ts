import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  langs: string[] = [];
  language!: string;

  constructor(
    private userService: UserService,
    private translateService: TranslateService)
    {
      this.langs = this.translateService.getLangs();
    }

  ngOnInit() {
    this.userService.checkLogin()
  }


changeLang(event:any) {
    this.translateService.use(event.detail.value);
  }


}
