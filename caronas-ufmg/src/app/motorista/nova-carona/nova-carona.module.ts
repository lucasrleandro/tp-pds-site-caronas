import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaCaronaPageRoutingModule } from './nova-carona-routing.module';

import { NovaCaronaPage } from './nova-carona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaCaronaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NovaCaronaPage]
})
export class NovaCaronaPageModule {}
