import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheCaronaPassageiroPage } from './detalhe-carona-passageiro.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheCaronaPassageiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheCaronaPassageiroPageRoutingModule {}
