import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { MenuFertComponent } from './Components/ListarInsumos/Fertilizantes/menu-fert/menu-fert.component';
import { MenuAgroComponent } from './Components/ListarInsumos/Agroquimicos/menu-agro/menu-agro.component';
import { MenuSemillasComponent } from './Components/ListarInsumos/Semillas/menu-semillas/menu-semillas.component';
import { MenuProduInsuComponent } from './Components/ListarInsumos/ProductosInsumos/menu-produ-insu/menu-produ-insu.component';
import { AltaSemillasComponent } from './Components/ListarInsumos/Semillas/alta-semillas/alta-semillas.component';
import { AltaFertComponent } from './Components/ListarInsumos/Fertilizantes/alta-fert/alta-fert.component';
import { AltaAgroComponent } from './Components/ListarInsumos/Agroquimicos/alta-agro/alta-agro.component';
import { AltaProduComponent } from './Components/ListarInsumos/ProductosInsumos/alta-produ/alta-produ.component';
import { MenuUniInsComponent } from './Components/ListarInsumos/Unidades/menu-uni-ins/menu-uni-ins.component';
import { AltaUniInsComponent } from './Components/ListarInsumos/Unidades/alta-uni-ins/alta-uni-ins.component';

const routes: Routes = [
  {path: '', component: LoginComponent},

  {path: 'home', component: HomeComponent, children: [
    {path: 'insumos-semillas', outlet: 'inicio-semillas', component: MenuSemillasComponent},
    {path: 'alta-semillas', outlet: 'add-semillas', component: AltaSemillasComponent},
    {path: 'insumos-fertilizantes', outlet: 'inicio-fertilizantes', component: MenuFertComponent},
    {path: 'alta-fertilizantes', outlet: 'add-fertilizantes', component: AltaFertComponent},
    {path: 'insumos-agroquimicos', outlet: 'inicio-agroquimicos', component: MenuAgroComponent},
    {path: 'alta-agroquimicos', outlet: 'add-agroquimicos', component: AltaAgroComponent},
    {path: 'insumos-productos', outlet: 'inicio-productos', component: MenuProduInsuComponent},
    {path: 'alta-productos', outlet: 'add-productos', component: AltaProduComponent},
    {path: 'insumos-unidades', outlet: 'inicio-unidades', component:  MenuUniInsComponent}]},
    {path: 'alta-unidades', outlet: 'add-unidades', component: AltaUniInsComponent}
 // {path: 'insumos-fertilizantes', component: MenuFertComponent},
 // {path: 'insumos-agroquimicos', component: MenuAgroComponent},
  // {path: 'insumos-semillas', component: MenuSemillasComponent},
  // {path: 'insumos-productos', component: MenuProduInsuComponent},
 // {path: 'alta-semillas', component: AltaSemillasComponent},
 // {path: 'alta-fertilizantes', component: AltaFertComponent},
  // {path: 'alta-agroquimicos', component: AltaAgroComponent},
 // {path: 'alta-productos', component: AltaProduComponent},
  // {path: 'alta-unidades', component: AltaUniInsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
