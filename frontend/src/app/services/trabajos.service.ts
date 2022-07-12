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

  actualizarEstadoTrabajo ( uid: string, data) {
    console.log("Actualizar con: ", data);
    return this.http.put(`${environment.base_url}/trabajos/et/${uid}`, data, this.cabeceras);
  }

  agregarValoracionTrabajo ( uid: string, data) {
    console.log("Actualizar con: ", data);
    return this.http.put(`${environment.base_url}/trabajos/av/${uid}`, data, this.cabeceras);
  }

  quitarValoracionTrabajo ( uid: string, data) {
    console.log("Actualizar con: ", data);
    return this.http.put(`${environment.base_url}/trabajos/qv/${uid}`, data, this.cabeceras);
  }

  actualizarContenidoTrabajo ( uid: string, data, num) { // llamada despues de subir el contenido correctamente
    console.log("Actualizar con: ", data);
    return this.http.put(`${environment.base_url}/trabajos/ac/${uid}?num=${num}`, data, this.cabeceras);
  }

  borrarContenidoTrabajo ( uid: string, num) { // llamada para quitar algun contenido del trabajo
    console.log("Borrar con: ", num);
    const datos: FormData = new FormData();
    datos.append('posicion', num);
    return this.http.put(`${environment.base_url}/trabajos/bc/${uid}`, datos, this.cabeceras);
  }

  limpiarMultimediaTrabajo ( uid: string) {

    return this.http.put(`${environment.base_url}/trabajos/lm/${uid}`, '', this.cabeceras);
  }

  obtenerTrabajo (uid: string){
    return this.http.get(`${environment.base_url}/trabajos/?id=${uid}`, this.cabeceras);
  }

  cargarTrabajos( desde: number, textoBusqueda?: string ): Observable<object> {
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/trabajos/?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
  }

  cargarTrabajosVisibles( desde: number, textoBusqueda?: string ): Observable<object> {
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/trabajos/tv/?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
  }

  cargarTrabajosValorados(): Observable<object> {
    return this.http.get(`${environment.base_url}/trabajos/mv/` , this.cabeceras);
  }

  cargarTrabajosAleatorios(): Observable<object> {
    return this.http.get(`${environment.base_url}/trabajos/aleatorios/` , this.cabeceras);
  }

  cargarTrabajosRecientes(): Observable<object> {
    return this.http.get(`${environment.base_url}/trabajos/mr/` , this.cabeceras);
  }

  cargarTrabajosTodo(): Observable<object> {
    return this.http.get(`${environment.base_url}/trabajos` , this.cabeceras);
  }

  cargarTrabajosEditor( desde: number, textoBusqueda?: string ): Observable<object> { // get trabajos para revisar
    if (!desde) { desde = 0;}
    if (!textoBusqueda) {textoBusqueda = '';}
    return this.http.get(`${environment.base_url}/trabajos/tr/?desde=${desde}&texto=${textoBusqueda}` , this.cabeceras);
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

  subirConts( uid: string, foto: File) {
    const url = `${environment.base_url}/upload/trabajoconts/${uid}`;
    const datos: FormData = new FormData();
    datos.append('archivo', foto, foto.name);
    return this.http.post(`${environment.base_url}/upload/trabajoconts/${uid}`, datos, this.cabeceras);
  }


  //quitar luego estas llamadas
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

  //Llamadas obtención archivos

  crearImagenUrl( imagen: string) {

    const token = localStorage.getItem('token') || '';
    if (!imagen) {
      return `${environment.base_url}/upload/trabajoimg/nofoto.PNG?token=${token}`;
    }
    return `${environment.base_url}/upload/trabajoimg/${imagen}?token=${token}`;
  }

  crearContenidosUrl( imagen: string) { // imagenes adicionales trabajo

    const token = localStorage.getItem('token') || '';
    if (!imagen) {
      return `${environment.base_url}/upload/trabajoconts/no-imagen.jpg?token=${token}`;
    }
    return `${environment.base_url}/upload/trabajoconts/${imagen}?token=${token}`;
  }

  // quitar mas tarde estas llamadas
  crearImagenesUrl( imagen: string) { // imagenes adicionales trabajo

    const token = localStorage.getItem('token') || '';
    if (!imagen) {
      return `${environment.base_url}/upload/trabajoimgs/no-imagen.jpg?token=${token}`;
    }
    return `${environment.base_url}/upload/trabajoimgs/${imagen}?token=${token}`;
  }

  crearVideoUrl( video: string) { // videos adicionales trabajo

    const token = localStorage.getItem('token') || '';
    return `${environment.base_url}/upload/trabajovideos/${video}?token=${token}`;
  }

  crearDocUrl( doc: string) { // docs adicionales trabajo

    const token = localStorage.getItem('token') || '';
    return `${environment.base_url}/upload/trabajodocs/${doc}?token=${token}`;
  }

  crearAudioUrl( audio: string) { // audios adicionales trabajo

    const token = localStorage.getItem('token') || '';
    return `${environment.base_url}/upload/trabajoaudios/${audio}?token=${token}`;
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
