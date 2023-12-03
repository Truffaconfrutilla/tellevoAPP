import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  langs: string[] = [];
  language!: string;


  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) { 
    this.langs = this.translateService.getLangs();    
  }

  ngOnInit() {
  }

  changeLang(event:any) {
    this.translateService.use(event.detail.value);
    localStorage.setItem('languaje',event.detail.value)
  }

}