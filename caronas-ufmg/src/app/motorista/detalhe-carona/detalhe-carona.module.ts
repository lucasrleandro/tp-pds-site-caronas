import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheCaronaPageRoutingModule } from './detalhe-carona-routing.module';

import { DetalheCaronaPage } from './detalhe-carona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheCaronaPageRoutingModule
  ],
  declarations: [DetalheCaronaPage]
})
export class DetalheCaronaPageModule {}
