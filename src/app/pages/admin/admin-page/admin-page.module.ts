import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPagePageRoutingModule } from './admin-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AdminPagePage } from './admin-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    TranslateModule
  ],
  declarations: [AdminPagePage]
})
export class AdminPagePageModule {}
