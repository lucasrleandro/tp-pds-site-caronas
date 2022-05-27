import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaCaronaPage } from './nova-carona.page';

const routes: Routes = [
  {
    path: '',
    component: NovaCaronaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaCaronaPageRoutingModule {}
