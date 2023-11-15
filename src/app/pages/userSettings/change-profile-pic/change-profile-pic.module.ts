import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeProfilePicPageRoutingModule } from './change-profile-pic-routing.module';

import { ChangeProfilePicPage } from './change-profile-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeProfilePicPageRoutingModule
  ],
  declarations: [ChangeProfilePicPage]
})
export class ChangeProfilePicPageModule {}
