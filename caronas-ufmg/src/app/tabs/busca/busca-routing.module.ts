import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscaPage } from './busca.page';

const routes: Routes = [
  {
    path: '',
    component: BuscaPage
  },
  {
    path: 'detalhe-carona/:id',
    loadChildren: () => import('../passageiro/detalhe-carona-passageiro/detalhe-carona-passageiro.module').then(m => m.DetalheCaronaPassageiroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscaPageRoutingModule { }
