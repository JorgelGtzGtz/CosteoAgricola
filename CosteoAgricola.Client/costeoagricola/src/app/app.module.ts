import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MenuComponent } from './Components/menu/menu.component';
import { IndexComponent } from './Components/index/index.component';
import { HomeComponent } from './Components/home/home.component';
import { MenuFertComponent } from './Components/ListarInsumos/Fertilizantes/menu-fert/menu-fert.component';
import { MenuAgroComponent } from './Components/ListarInsumos/Agroquimicos/menu-agro/menu-agro.component';
import { MenuProduInsuComponent } from './Components/ListarInsumos/ProductosInsumos/menu-produ-insu/menu-produ-insu.component';
import { MenuSemillasComponent } from './Components/ListarInsumos/Semillas/menu-semillas/menu-semillas.component';
import { AltaAgroComponent } from './Components/ListarInsumos/Agroquimicos/alta-agro/alta-agro.component';
import { AltaFertComponent } from './Components/ListarInsumos/Fertilizantes/alta-fert/alta-fert.component';
import { AltaProduComponent } from './Components/ListarInsumos/ProductosInsumos/alta-produ/alta-produ.component';
import { AltaSemillasComponent } from './Components/ListarInsumos/Semillas/alta-semillas/alta-semillas.component';
import { AltaUniInsComponent } from './Components/ListarInsumos/Unidades/alta-uni-ins/alta-uni-ins.component';
import { MenuUniInsComponent } from './Components/ListarInsumos/Unidades/menu-uni-ins/menu-uni-ins.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MenuComponent,
    IndexComponent,
    HomeComponent,
    MenuFertComponent,
    MenuAgroComponent,
    MenuProduInsuComponent,
    MenuSemillasComponent,
    AltaAgroComponent,
    AltaFertComponent,
    AltaProduComponent,
    AltaSemillasComponent,
    MenuUniInsComponent,
    AltaUniInsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
