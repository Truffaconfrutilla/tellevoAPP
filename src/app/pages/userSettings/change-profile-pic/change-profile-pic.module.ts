import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeProfilePicPageRoutingModule } from './change-profile-pic-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeProfilePicPage } from './change-profile-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeProfilePicPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ChangeProfilePicPage]
})
export class ChangeProfilePicPageModule {}
