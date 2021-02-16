import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { Semillas } from '../../models/Semillas';

@Injectable({
  providedIn: 'root'
})
export class SemillasInsumosService {
  private _url = `${AppSettings.API_ENDPOINT}/Semillas`;
  private _getLista = `${this._url}/Lista`;
  private _getGetSemilla = `${this._url}/GetSemilla`;
  private _getTiposMedidas = `${this._url}/TiposMedidas`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }

  getLista(semillas: String, invent: boolean, status: boolean): Observable<any[]> {
    const params = new HttpParams().set('semillas', semillas.toString())
                                .set('inventariable',invent.toString())
                                .set('estatus',status.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getSemilla(id: number): Observable<Semillas>  {
    return this._http.get<Semillas>(`${this._getGetSemilla}/${id}`, { headers: this._userService.header})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getTiposMedidas(): Observable<any[]> {
    return this._http.get<any[]>(this._getTiposMedidas, { params: null, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  
  guardar(_semilla: any): Observable<Semillas> {
    return this._http.post<Semillas>(`${this._guardar}`, _semilla, { headers: this._userService.header})
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
