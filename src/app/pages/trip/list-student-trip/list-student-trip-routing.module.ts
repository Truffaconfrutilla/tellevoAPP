import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListStudentTripPage } from './list-student-trip.page';

const routes: Routes = [
  {
    path: '',
    component: ListStudentTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListStudentTripPageRoutingModule {}
