import { Component, OnInit } from '@angular/core';
import { proxyMethods } from '@ionic/angular/common/utils/proxy';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.page.html',
  styleUrls: ['./change-profile-pic.page.scss'],
})
export class ChangeProfilePicPage implements OnInit {
  langs: string[] = [];

  constructor(
    private translateService: TranslateService,
  ) {
    this.langs = this.translateService.getLangs();
  }

  ngOnInit() {
  }
}
