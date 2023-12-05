import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartTripPageRoutingModule } from './start-trip-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { StartTripPage } from './start-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartTripPageRoutingModule,
    TranslateModule
  ],
  declarations: [StartTripPage]
})
export class StartTripPageModule {}
