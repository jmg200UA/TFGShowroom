import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { loginForm  } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Trabajo } from '../models/trabajo.model'

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  cargarEjercicios: any;

  constructor(private http: HttpClient,
               private router: Router) { }

  nuevoTrabajo ( data: Trabajo) {
    return this.http.post(`${environment.base_url}/trabajos/`, data, this.cabeceras);
  }

  actualizarTrabajo ( uid: string, data: Trabajo) {

    return this.http.put(`${environment.base_url}/trabajos/${uid}`, data, this.cabeceras);
  }

  obtenerTrabajo (uid: string){
    return this.http.get(`${environment.base_url}/trabajos/?id=${uid}`, this.cabeceras);
  }

  cargarTrabajos( desde: number, textoBusqueda?: string ): Observable<object> {
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/trabajos/?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
  }

  cargarTrabajosAluVisibles(uid: string, desde: number, textoBusqueda?: string ): Observable<object> {
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/trabajos/v/?id=${uid}&?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
  }

  cargarTrabajosAluNoVisibles(uid: string, desde: number, textoBusqueda?: string ): Observable<object> {
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/trabajos/nv/?id=${uid}&?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
  }

  borrarTrabajo( uid: string) {
    if (!uid || uid === null) {uid = 'a'; }
    return this.http.delete(`${environment.base_url}/trabajos/${uid}` , this.cabeceras);
  }

  //Llamadas subida archivos

  subirFoto( uid: string, foto: File) {
    const url = `${environment.base_url}/upload/trabajoimg/${uid}`;
    const datos: FormData = new FormData();
    datos.append('archivo', foto, foto.name);
    return this.http.post(`${environment.base_url}/upload/trabajoimg/${uid}`, datos, this.cabeceras);
  }

  subirFotos( uid: string, foto: File) {
    const url = `${environment.base_url}/upload/trabajoimgs/${uid}`;
    const datos: FormData = new FormData();
    datos.append('archivo', foto, foto.name);
    return this.http.post(`${environment.base_url}/upload/trabajoimgs/${uid}`, datos, this.cabeceras);
  }

  subirVideos( uid: string, video: File) {
    const url = `${environment.base_url}/upload/trabajovideos/${uid}`;
    const datos: FormData = new FormData();
    datos.append('archivo', video, video.name);
    return this.http.post(`${environment.base_url}/upload/trabajovideos/${uid}`, datos, this.cabeceras);
  }

  subirAudios( uid: string, audio: File) {
    const url = `${environment.base_url}/upload/trabajoaudios/${uid}`;
    const datos: FormData = new FormData();
    datos.append('archivo', audio, audio.name);
    return this.http.post(`${environment.base_url}/upload/trabajoaudios/${uid}`, datos, this.cabeceras);
  }

  subirDocs( uid: string, doc: File) {
    const url = `${environment.base_url}/upload/trabajodocs/${uid}`;
    const datos: FormData = new FormData();
    datos.append('archivo', doc, doc.name);
    return this.http.post(`${environment.base_url}/upload/trabajodocs/${uid}`, datos, this.cabeceras);
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
