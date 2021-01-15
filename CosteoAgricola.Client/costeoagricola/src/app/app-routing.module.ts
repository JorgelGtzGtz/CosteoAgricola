import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
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
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { MenuCicloComponent } from './Components/ListarCatalogos/CicloAgricola/menu-ciclo/menu-ciclo.component';
import { AltaCicloComponent } from './Components/ListarCatalogos/CicloAgricola/alta-ciclo/alta-ciclo.component';


const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  //INSUMOS
  {path: 'menu-semillas', component: MenuSemillasComponent},
  {path: 'alta-semillas', component: AltaSemillasComponent},

  {path: 'menu-fertilizantes', component: MenuFertComponent},
  {path: 'alta-fertilizantes', component: AltaFertComponent},

  {path: 'menu-agroquimicos', component: MenuAgroComponent},
  {path: 'alta-agroquimicos', component: AltaAgroComponent},

  {path: 'menu-productos', component: MenuProduInsuComponent},
  {path: 'alta-productos', component: AltaProduComponent},

  {path: 'menu-unidades', component: MenuUniInsComponent},
  {path: 'alta-unidades', component: AltaUniInsComponent},

  //CATALOGOS
  {path: 'menu-ciclo', component: MenuCicloComponent},
  {path: 'alta-ciclo', component: AltaCicloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
