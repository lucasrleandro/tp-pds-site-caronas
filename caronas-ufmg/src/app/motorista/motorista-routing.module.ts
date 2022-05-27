import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotoristaPage } from './motorista.page';

const routes: Routes = [
  {
    path: '',
    component: MotoristaPage
  },
  {
    path: 'nova-carona',
    loadChildren: () => import('./nova-carona/nova-carona.module').then( m => m.NovaCaronaPageModule)
  },
  {
    path: 'detalhe-carona',
    loadChildren: () => import('./detalhe-carona/detalhe-carona.module').then( m => m.DetalheCaronaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristaPageRoutingModule {}
