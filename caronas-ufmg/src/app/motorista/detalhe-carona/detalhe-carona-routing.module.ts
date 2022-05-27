import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheCaronaPage } from './detalhe-carona.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheCaronaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheCaronaPageRoutingModule {}
