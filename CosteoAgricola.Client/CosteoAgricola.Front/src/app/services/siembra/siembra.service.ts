import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { Siembra } from '../../models/Siembra';


@Injectable({
  providedIn: 'root'
})
export class SiembraService {
  private _url = `${AppSettings.API_ENDPOINT}/Siembras`;
  private _getLista = `${this._url}/Lista`;
  private _getGetSiembra = `${this._url}/GetSiembra`;
  private _getGetCiclos = `${this._url}/GetCiclos`;
  private _getGetLotes = `${this._url}/GetLotes`;
  private _getGetSemillas = `${this._url}/GetSemillas`;
  private _guardar = `${this._url}/Guardar`;
  private _eliminar = `${this._url}/Eliminar`;

  constructor(public _http: HttpClient ,private _userService: UsersService) {
    this._userService.loadStorage();
  }

  getLista(descripcion: String, ciclo: String, estatus: boolean, lote: String, semilla:String): Observable<any[]> {
    const params = new HttpParams().set('descripcion', descripcion.toString())
                                .set('ciclo',ciclo.toString())
                                .set('estatus',estatus.toString())
                                .set('lote',lote.toString())
                                .set('semilla',semilla.toString());
    return this._http.get<any[]>(this._getLista, { params: params, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getSiembra(id: number): Observable<Siembra>  {
    return this._http.get<Siembra>(`${this._getGetSiembra}/${id}`, { headers: this._userService.header})
      .pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }
  getCiclos(): Observable<any[]> {
    return this._http.get<any[]>(this._getGetCiclos, { params: null, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getLotes(): Observable<any[]> {
    return this._http.get<any[]>(this._getGetLotes, { params: null, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getSemillas(): Observable<any[]> {
    return this._http.get<any[]>(this._getGetSemillas, { params: null, headers: this._userService.header})
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  guardar(_siembra: any): Observable<Siembra> {
    return this._http.post<Siembra>(`${this._guardar}`, _siembra, { headers: this._userService.header})
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
