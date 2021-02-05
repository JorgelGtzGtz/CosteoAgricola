import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  UsersService,
  LoginGuardGuard,
  TiposUsuarioService,
  DashboardService
 } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    LoginGuardGuard,
    TiposUsuarioService,
    DashboardService
  ]
})
export class ServiceModule { }
