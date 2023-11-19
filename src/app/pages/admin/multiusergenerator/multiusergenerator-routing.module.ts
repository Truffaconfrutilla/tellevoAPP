import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiusergeneratorPage } from './multiusergenerator.page';

const routes: Routes = [
  {
    path: '',
    component: MultiusergeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiusergeneratorPageRoutingModule {}
