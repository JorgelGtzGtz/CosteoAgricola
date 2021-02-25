import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { Ciclo } from '../../models/Ciclo';

@Injectable({
  providedIn: 'root'
})
export class CiclosService {
  private _url = `${AppSettings.API_ENDPOINT}/Ciclos`;
  private _getLista = `${this._url}/Lista`;
  private _getGetCiclo = `${this._url}/GetCiclo`;
 // private _getTiposMedidas = `${this._url}/TiposMedidas`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }

  getLista(ciclo: string ,estatus: boolean,): Observable<any[]> {
    const params = new HttpParams().set('ciclo', ciclo.toString())
                                .set('estatus',estatus.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getCiclo(id: number): Observable<Ciclo>  {
    return this._http.get<Ciclo>(`${this._getGetCiclo}/${id}`, { headers: this._userService.header})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  
  guardar(_ciclo: any): Observable<Ciclo> {
    return this._http.post<Ciclo>(`${this._guardar}`, _ciclo, { headers: this._userService.header})
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
