import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { loginForm  } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Titulacion } from '../models/titulacion.model'

@Injectable({
  providedIn: 'root'
})
export class TitulacionService {
  cargarEjercicios: any;

  constructor(private http: HttpClient,
               private router: Router) { }

  nuevaTitulacion ( data: Titulacion) {
    return this.http.post(`${environment.base_url}/titulaciones/`, data, this.cabeceras);
  }

  actualizarTitulacion ( uid: string, data: Titulacion) {

    return this.http.put(`${environment.base_url}/titulaciones/${uid}`, data, this.cabeceras);
  }

  obtenerTitulacion (uid: string){
    return this.http.get(`${environment.base_url}/titulaciones/?id=${uid}`, this.cabeceras);
  }

  cargarTitulaciones( desde: number, textoBusqueda?: string ): Observable<object> {
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/titulaciones/?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
  }

  borrarTitulacion( uid: string) {
    if (!uid || uid === null) {uid = 'a'; }
    return this.http.delete(`${environment.base_url}/titulaciones/${uid}` , this.cabeceras);
  }

  get cabeceras() {
    return {
      headers: {
        'x-token': this.token
      }};
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


}
