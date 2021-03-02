import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// Modules
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

// Directives
import { DatepickerToggleDirective } from '../directives/datepicker-toggle.directive';

// Pagination
import {NgxPaginationModule} from 'ngx-pagination';
// Routes
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposUsuarioComponent } from './tipos-usuario/tipos-usuario.component';
import { SemillasInsumosComponent } from './semillas-insumos/semillas-insumos.component';
import { UnidadesInsumosComponent } from './unidades-insumos/unidades-insumos/unidades-insumos.component';
import { LotesComponent } from './lotes/lotes.component';
import { ProductosInsumosComponent } from './productos-insumos/productos-insumos.component';
import { CicloComponent } from './ciclo/ciclo.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SiembraComponent } from './siembra/siembra.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UsuariosComponent,
        TiposUsuarioComponent,
        DatepickerToggleDirective,
        SemillasInsumosComponent,
        UnidadesInsumosComponent,
        LotesComponent,
        ProductosInsumosComponent,
        CicloComponent,
        SiembraComponent
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PagesRoutingModule,
        NgSelectModule,
        NgOptionHighlightModule,
        NgbModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
        NgxPaginationModule
    ],
    exports: [
        DashboardComponent
    ]
})
export class PagesModule {}
