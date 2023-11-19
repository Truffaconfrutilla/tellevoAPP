import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiusergeneratorPageRoutingModule } from './multiusergenerator-routing.module';

import { MultiusergeneratorPage } from './multiusergenerator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiusergeneratorPageRoutingModule
  ],
  declarations: [MultiusergeneratorPage]
})
export class MultiusergeneratorPageModule {}
