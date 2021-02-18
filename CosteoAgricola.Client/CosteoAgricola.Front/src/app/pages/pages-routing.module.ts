import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposUsuarioComponent } from './tipos-usuario/tipos-usuario.component';
import { SemillasInsumosComponent } from './semillas-insumos/semillas-insumos.component';
import { UnidadesInsumosComponent } from './unidades-insumos/unidades-insumos/unidades-insumos.component';
import { LotesComponent } from './lotes/lotes.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'tiposusuario',
    component: TiposUsuarioComponent
  },
  {
    path: 'semillasInsumos',
    component: SemillasInsumosComponent
  },
  {
    path: 'unidadesInsumos',
    component: UnidadesInsumosComponent
  },
  {
    path: 'lotes',
    component: LotesComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
