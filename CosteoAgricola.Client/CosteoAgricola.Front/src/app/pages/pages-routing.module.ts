import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposUsuarioComponent } from './tipos-usuario/tipos-usuario.component';
import { SemillasInsumosComponent } from './semillas-insumos/semillas-insumos.component';
import { UnidadesInsumosComponent } from './unidades-insumos/unidades-insumos/unidades-insumos.component';
import { LotesComponent } from './lotes/lotes.component';
import { ProductosInsumosComponent } from './productos-insumos/productos-insumos.component';
import { CicloComponent } from './ciclo/ciclo.component';
import { SiembraComponent } from './siembra/siembra.component';
import { FertilizantesComponent } from './fertilizantes/fertilizantes.component';

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
    path: 'productosInsumos',
    component: ProductosInsumosComponent
  } ,
  {
    path: 'lotes',
    component: LotesComponent
  },
  {
    path: 'ciclos',
    component: CicloComponent
  },
  {
    path: 'siembra',
    component: SiembraComponent
  },
  {
    path: 'fertilizantes',
    component: FertilizantesComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
