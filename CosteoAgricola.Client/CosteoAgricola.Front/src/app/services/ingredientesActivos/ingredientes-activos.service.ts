import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AppSettings } from '../../models/app-settings';
import { UsersService } from '../users/users.service';
import { IngredientesActivos } from '../../models/IngredientesActivos';

@Injectable({
  providedIn: 'root'
})
export class IngredientesActivosService {
  private _url = `${AppSettings.API_ENDPOINT}/IngredientesActivos`;
  private _getLista = `${this._url}/Lista`;
  private _getGetIngredienteActivo = `${this._url}/GetIngredienteActivo`;
  private _getTiposUnidades = `${this._url}/TiposUnidades`;
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

  getIngredienteActivo(id: number): Observable<IngredientesActivos>  {
    return this._http.get<IngredientesActivos>(`${this._getGetIngredienteActivo}/${id}`, { headers: this._userService.header})
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
  guardar(_ingrediente: any): Observable<IngredientesActivos> {
    return this._http.post<IngredientesActivos>(`${this._guardar}`, _ingrediente, { headers: this._userService.header})
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
