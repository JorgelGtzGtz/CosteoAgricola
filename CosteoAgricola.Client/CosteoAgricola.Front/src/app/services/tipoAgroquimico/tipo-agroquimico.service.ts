import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { TipoAgroquimico } from '../../models/TipoAgroquimico';

@Injectable({
  providedIn: 'root'
})
export class TipoAgroquimicoService {

  private _url = `${AppSettings.API_ENDPOINT}/TiposAgroquimicos`;
  private _getLista = `${this._url}/Lista`;
  private _getGetTipoAgro = `${this._url}/GetTipoAgro`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }

  getLista(nombre: String, estatus: boolean): Observable<any[]> {
    const params = new HttpParams().set('nombre', nombre.toString())
                                .set('estatus',estatus.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  getTipoAgroquimico(id: number): Observable<TipoAgroquimico>  {
    return this._http.get<TipoAgroquimico>(`${this._getGetTipoAgro}/${id}`, { headers: this._userService.header})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  guardar(_tipoAgro: any): Observable<TipoAgroquimico> {
    return this._http.post<TipoAgroquimico>(`${this._guardar}`, _tipoAgro, { headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  eliminar(id: number) {
      return this._http.delete(`${this._eliminar}/${id}`, { headers: this._userService.header}).pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  // Handdle Error methor for observale
  private handleError(err: HttpErrorResponse) {
    return throwError(err.error);
  }
}
