import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartTripPage } from './start-trip.page';

const routes: Routes = [
  {
    path: '',
    component: StartTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartTripPageRoutingModule {}
