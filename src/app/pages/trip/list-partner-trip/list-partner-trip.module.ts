import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPartnerTripPageRoutingModule } from './list-partner-trip-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListPartnerTripPage } from './list-partner-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPartnerTripPageRoutingModule,
    TranslateModule
  ],
  declarations: [ListPartnerTripPage]
})
export class ListPartnerTripPageModule {}
