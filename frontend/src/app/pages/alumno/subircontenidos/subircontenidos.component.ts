import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';

@Component({
  selector: 'subircontenidos',
  templateUrl: './subircontenidos.component.html',
  styleUrls: ['./subircontenidos.component.css']
})
export class SubircontenidosComponent implements OnInit {

  public contenidos: {nombre:string, descripcion:string, tipo:string, contenido:any}[]=[];
  private uid: string = '';
  public loading = true;
  public contenidossubidos;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private TrabajosService: TrabajosService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    console.log("UID: ", this.uid);
    this.cargarTrabajo();
  }

  cargarTrabajo(){
    this.loading = true;
    this.TrabajosService.obtenerTrabajo(this.uid)
      .subscribe( res => {
        console.log("LA RES de trabajos: ", res['trabajos']);
          this.contenidossubidos = res['trabajos'].contenidos;
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
  }

  cambioContenido( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['jpeg','jpg','png','PNG'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser una imagen jpeg, jpg o png'});
        return;
      }
      this.contenidos.push({nombre:"",descripcion:"",tipo:extension,contenido:evento.target.files[0]});
    }
  }

  cambioVideo(){ // para videos de youtube

  }

  addDatosContenido(num){
    this.contenidos[num].nombre= (document.getElementById("nombre"+num) as HTMLInputElement).value;
    this.contenidos[num].descripcion = (document.getElementById("nombre"+num) as HTMLInputElement).value;
    this.subirContenido(num);
  }

  addDatosContenidoAct(num){ // cambiar datos contenidos ya subido
    this.contenidos[num].nombre= (document.getElementById("nombre"+num) as HTMLInputElement).value;
    this.contenidos[num].descripcion = (document.getElementById("descripcion"+num) as HTMLInputElement).value;
    this.actualizarContenido(num);
  }

  subirContenido(num){
    //comprobamos que tenga todos los campos requeridos
    if(this.contenidos[num].nombre!="" && this.contenidos[num].descripcion!=""){
      this.TrabajosService.subirConts( this.uid, this.contenidos[num].contenido)
            .subscribe( res => {
              let jsonparse= JSON.stringify(res);
              //spliteamos el nombre del archivo de la res para actualizarlo en la bd
              let split = jsonparse.split(',');
              let split2 = split[2].split('"');
              let split3 = split2[3];
              this.contenidos[num].contenido = split3;
              console.log("Contenido: ", split3);
              //si todo sale bien hacemos la llamada para actualizar la bd con la subida del contenido
                this.TrabajosService.actualizarContenidoTrabajo( this.uid, this.contenidos[num])
                  .subscribe( res => {
                    console.log("Respuesta a la actualización: ", res);
                  }, (err) => {
                    const errtext = err.error.msg || 'No se pudo actualizar el contenido';
                    Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
                    return;
                  });
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo cargar el contenido';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Debes rellenar todos los campos',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  actualizarContenido(num){
    if(this.contenidos[num].nombre!="" && this.contenidos[num].descripcion!="" && this.contenidos[num].tipo!="" && this.contenidos[num].contenido!=""){
      this.TrabajosService.subirFoto( this.uid, this.contenidos[num].contenido)
                .subscribe( res => {
                  console.log("Respuesta a la subida de la foto: ", res);
                }, (err) => {
                  const errtext = err.error.msg || 'No se pudo cargar la imagen';
                  Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
                  return;
                });
    }
  }

}
