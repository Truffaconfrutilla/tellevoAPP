import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskTripPage } from './ask-trip.page';

const routes: Routes = [
  {
    path: '',
    component: AskTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskTripPageRoutingModule {}
