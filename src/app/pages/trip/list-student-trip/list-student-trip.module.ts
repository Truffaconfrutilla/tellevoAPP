import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListStudentTripPageRoutingModule } from './list-student-trip-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ListStudentTripPage } from './list-student-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListStudentTripPageRoutingModule,
    TranslateModule
  ],
  declarations: [ListStudentTripPage]
})
export class ListStudentTripPageModule {}
