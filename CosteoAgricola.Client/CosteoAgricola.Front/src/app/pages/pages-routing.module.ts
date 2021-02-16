import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposUsuarioComponent } from './tipos-usuario/tipos-usuario.component';
import { SemillasInsumosComponent } from './semillas-insumos/semillas-insumos.component';


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
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
