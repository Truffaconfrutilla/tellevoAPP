import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskTripPageRoutingModule } from './ask-trip-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AskTripPage } from './ask-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskTripPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AskTripPage]
})
export class AskTripPageModule {}
