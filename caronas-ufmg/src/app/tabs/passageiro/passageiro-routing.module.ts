import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassageiroPage } from './passageiro.page';

const routes: Routes = [
  {
    path: '',
    component: PassageiroPage
  },
  {
    path: 'detalhe-carona-passageiro',
    loadChildren: () => import('./detalhe-carona-passageiro/detalhe-carona-passageiro.module').then( m => m.DetalheCaronaPassageiroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassageiroPageRoutingModule {}
