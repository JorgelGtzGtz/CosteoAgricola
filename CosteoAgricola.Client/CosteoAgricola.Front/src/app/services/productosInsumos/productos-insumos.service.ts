import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { Productos } from '../../models/Productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosInsumosService {
  private _url = `${AppSettings.API_ENDPOINT}/Productos`;
  private _getLista = `${this._url}/Lista`;
  private _getGeProducto = `${this._url}/GetProducto`;
  private _getTiposUnidades = `${this._url}/TiposUnidades`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }

  getLista(nombre: string , inventariable: boolean,estatus: boolean, ): Observable<any[]> {
    const params = new HttpParams().set('nombre', nombre.toString())
                                .set('inventariable',inventariable.toString())
                                .set('estatus',estatus.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getProducto(id: number): Observable<Productos>  {
    return this._http.get<Productos>(`${this._getGeProducto}/${id}`, { headers: this._userService.header})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getTiposUnidades(): Observable<any[]> {
    return this._http.get<any[]>(this._getTiposUnidades, { params: null, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  guardar(_lote: any): Observable<Productos> {
    return this._http.post<Productos>(`${this._guardar}`, _lote, { headers: this._userService.header})
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
