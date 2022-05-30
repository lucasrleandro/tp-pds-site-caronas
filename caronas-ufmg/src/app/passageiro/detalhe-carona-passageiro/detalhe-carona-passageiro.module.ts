import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheCaronaPassageiroPageRoutingModule } from './detalhe-carona-passageiro-routing.module';

import { DetalheCaronaPassageiroPage } from './detalhe-carona-passageiro.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    DetalheCaronaPassageiroPageRoutingModule
  ],
  declarations: [DetalheCaronaPassageiroPage]
})
export class DetalheCaronaPassageiroPageModule {}
