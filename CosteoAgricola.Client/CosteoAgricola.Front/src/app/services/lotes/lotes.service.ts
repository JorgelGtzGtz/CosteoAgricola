import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { Lotes } from '../../models/Lotes';

@Injectable({
  providedIn: 'root'
})
export class LotesService {
  private _url = `${AppSettings.API_ENDPOINT}/Lotes`;
  private _getLista = `${this._url}/Lista`;
  private _getGetLote = `${this._url}/GetLote`;
 // private _getTiposMedidas = `${this._url}/TiposMedidas`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }
  getLista(estatus: boolean, hectarea1: string , hectarea2: string): Observable<any[]> {
    const params = new HttpParams().set('estatus', estatus.toString())
                                .set('hectarea1',hectarea1.toString())
                                .set('hectarea2',hectarea2.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getLote(id: number): Observable<Lotes>  {
    return this._http.get<Lotes>(`${this._getGetLote}/${id}`, { headers: this._userService.header})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
/*
  getTiposMedidas(): Observable<any[]> {
    return this._http.get<any[]>(this._getTiposMedidas, { params: null, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
*/
  guardar(_lote: any): Observable<Lotes> {
    return this._http.post<Lotes>(`${this._guardar}`, _lote, { headers: this._userService.header})
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
