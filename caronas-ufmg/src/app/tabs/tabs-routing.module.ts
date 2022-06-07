import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'passageiro',
        loadChildren: () => import('./passageiro/passageiro.module').then(m => m.PassageiroPageModule)
      },
      {
        path: 'motorista',
        loadChildren: () => import('./motorista/motorista.module').then(m => m.MotoristaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'busca',
        loadChildren: () => import('./busca/busca.module').then(m => m.BuscaPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/busca',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
