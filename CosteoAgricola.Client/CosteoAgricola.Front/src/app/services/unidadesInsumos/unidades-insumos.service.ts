import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { Unidades } from '../../models/Unidades';


@Injectable({
  providedIn: 'root'
})
export class UnidadesInsumosService {
  private _url = `${AppSettings.API_ENDPOINT}/Unidades`;
  private _getLista = `${this._url}/Lista`;
  private _getGetUnidad= `${this._url}/GetUnidad`;
  private _getTiposUnidades = `${this._url}/TiposUnidades`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }

  getLista(unidades: String, status: boolean): Observable<any[]> {
    const params = new HttpParams().set('unidades', unidades.toString())
                                .set('estatus',status.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getUnidad(id: number): Observable<Unidades>  {
    return this._http.get<Unidades>(`${this._getGetUnidad}/${id}`, { headers: this._userService.header})
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

  guardar(_unidad: any): Observable<Unidades> {
    return this._http.post<Unidades>(`${this._guardar}`, _unidad, { headers: this._userService.header})
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
