import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
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
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { MenuCicloComponent } from './Components/ListarCatalogos/CicloAgricola/menu-ciclo/menu-ciclo.component';
import { AltaCicloComponent } from './Components/ListarCatalogos/CicloAgricola/alta-ciclo/alta-ciclo.component';
import { MenuLotesComponent } from './Components/ListarCatalogos/Lotes/menu-lotes/menu-lotes.component';
import { AltaLotesComponent } from './Components/ListarCatalogos/Lotes/alta-lotes/alta-lotes.component';
import { MenuSiembraComponent } from './Components/ListarCatalogos/Siembra/menu-siembra/menu-siembra.component';
import { AltaSiembraComponent } from './Components/ListarCatalogos/Siembra/alta-siembra/alta-siembra.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

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
    AltaUniInsComponent,
    WelcomeComponent,
    MenuCicloComponent,
    AltaCicloComponent,
    MenuLotesComponent,
    AltaLotesComponent,
    MenuSiembraComponent,
    AltaSiembraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
