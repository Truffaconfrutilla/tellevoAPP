import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPartnerTripPage } from './list-partner-trip.page';

const routes: Routes = [
  {
    path: '',
    component: ListPartnerTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPartnerTripPageRoutingModule {}
