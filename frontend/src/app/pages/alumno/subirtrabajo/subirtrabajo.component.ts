import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';

@Component({
  selector: 'subirtrabajo',
  templateUrl: './subirtrabajo.component.html',
  styleUrls: ['./subirtrabajo.component.css']
})
export class SubirtrabajoComponent implements OnInit {

  public foto: File = null;
  private formSubmited = false;
  private uid: string = '';
  public showOKP: boolean = false;
  public tipo : string = '';
  public fileText = 'Seleccione imagen';
  public loading = true;

  //Arrays para guardar el contenido que se copiará a los campos del form group
  public imagenes: File [] = [];
  public videos: File [] = [];
  public audios: File [] = [];
  public documentos: File [] = [];
  //Arrays para guardar los nombres de estos contenidos
  public nomimagenes: String [] = [];
  public nomvideos: String [] = [];
  public nomaudios: String [] = [];
  public nomdocumentos: String [] = [];



  public datosForm = this.fb.group({
    //Ya registrados, pero para mostrar
    titulo: ['', Validators.required ],
    autor: ['', Validators.required ],
    area: ['', Validators.required ],
    titulacion: ['', Validators.required ],
    tipo: ['', Validators.required ],
    //********************** */
    resumen: ['', Validators.required ],
    imagen: [''],
    director: ['', Validators.required ],
    //Contenido multimedia que quiera adjuntar el alumno
    // imagenes: [''],
    // videos: [''],
    // audios: [''],
    // documentos: [''],

  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private TrabajosService: TrabajosService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    console.log("UID: ", this.uid);
    this.cargarTrabajo();
  }

  cancelar(): void {
    // Si estamos creando uno nuevo, vamos a la lista
      this.router.navigateByUrl('/admin/titulaciones');
  }

  enviar(): void {
    this.formSubmited = true;
    if (this.datosForm.invalid) { return; }

    //Llamar a actualizar trabajo
    //Hacer bucle para cada array de archivos para subirlos uno a uno
      this.TrabajosService.actualizarTrabajo( this.uid,this.datosForm.value )
        .subscribe( res => {
          console.log("Trabajo creado: ", res['trabajo']);
          //Subida imagen del trabajo
          if (this.foto ) {
            this.TrabajosService.subirFoto( res['trabajo'].uid, this.foto)
            .subscribe( res => {
              console.log("Respuesta a la subida de la foto: ", res);
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo cargar la imagen';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
          }
          //Subida imagenes adicional
          if(this.imagenes.length>0){
            for(var i=0; i<this.imagenes.length; i++){
              this.TrabajosService.subirFotos( res['trabajo'].uid, this.imagenes[i])
            .subscribe( res => {
              console.log("Respuesta a la subida de la foto: ", res);
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo cargar la imagen';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
            }
          }
          //Subida videos adicional
          if(this.videos.length>0){
            for(var i=0; i<this.videos.length; i++){
              this.TrabajosService.subirVideos( res['trabajo'].uid, this.videos[i])
            .subscribe( res => {
              console.log("Respuesta a la subida del video: ", res);
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo cargar el video';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
            }
          }
          //Subida audios adicional
          if(this.audios.length>0){
            for(var i=0; i<this.audios.length; i++){
              this.TrabajosService.subirAudios( res['trabajo'].uid, this.audios[i])
            .subscribe( res => {
              console.log("Respuesta a la subida del audio: ", res);
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo cargar el audio';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
            }
          }
          //Subida documentos adicional
          if(this.documentos.length>0){
            for(var i=0; i<this.documentos.length; i++){
              this.TrabajosService.subirDocs( res['trabajo'].uid, this.documentos[i])
            .subscribe( res => {
              console.log("Respuesta a la subida del documento: ", res);
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo cargar el documento';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
            }
          }

          this.datosForm.markAsPristine();

          Swal.fire({
            icon: 'success',
            title: 'Trabajo subido correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigateByUrl('/alumno/trabajos');

        }, (err) => {
          const errtext = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo.';
          Swal.fire({icon: 'error', title: 'Oops...', text: errtext,});
          return;
        });


  }

  cargarTrabajo(){
    this.loading = true;
    this.TrabajosService.obtenerTrabajo(this.uid)
      .subscribe( res => {
        // Obtenemos los trabajos del alumno que han sido aceptados por el editor y por lo tanto publicados
        console.log("LA RES de trabajos: ", res['trabajos']);
        this.datosForm.get('titulo').setValue(res['trabajos'].titulo);
        this.datosForm.get('titulo').disable();
        this.datosForm.get('autor').setValue(res['trabajos'].autor.nombre_apellidos);
        this.datosForm.get('autor').disable();
        this.datosForm.get('area').setValue(res['trabajos'].area);
        this.datosForm.get('area').disable();
        this.datosForm.get('titulacion').setValue(res['trabajos'].titulacion.nombre);
        this.datosForm.get('titulacion').disable();
        this.datosForm.get('tipo').setValue(res['trabajos'].tipo);
        this.datosForm.get('tipo').disable();

      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
  }

  cambioImagen( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['jpeg','jpg','png','PNG'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        // Si no teniamos ningúna foto ya seleccionada antes, dejamos el campo pristine
        if (this.foto === null) {
          this.datosForm.get('imagen').markAsPristine();
        }
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser una imagen jpeg, jpg o png'});
        return;
      }
      this.foto = evento.target.files[0];
      this.fileText = nombre;
    }
  }

  //Funciones para ir agregando los contenidos al array y mostrarlos en el front
  cambioImagenes( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['jpeg','jpg','png','PNG'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        // Si no teniamos ningúna foto ya seleccionada antes, dejamos el campo pristine
          this.datosForm.get('imagenes').markAsPristine();
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser una imagen jpeg, jpg o png'});
        return;
      }
      this.imagenes.push(evento.target.files[0]);
      this.nomimagenes.push(nombre);
    }
  }

  cambioVideos( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['mp4','MP4','avi','AVI'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        // Si no teniamos ningúna foto ya seleccionada antes, dejamos el campo pristine
          this.datosForm.get('videos').markAsPristine();
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser un video mp4 o avi'});
        return;
      }
      this.videos.push(evento.target.files[0]);
      this.nomvideos.push(nombre);
    }
  }

  cambioDocumentos( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['pdf','PDF'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        // Si no teniamos ningúna foto ya seleccionada antes, dejamos el campo pristine
          this.datosForm.get('documentos').markAsPristine();
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser un documento pdf'});
        return;
      }
      this.documentos.push(evento.target.files[0]);
      this.nomdocumentos.push(nombre);
    }
  }

  cambioAudios( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['mp3','MP3','wav','WAV'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        // Si no teniamos ningúna foto ya seleccionada antes, dejamos el campo pristine
          this.datosForm.get('audios').markAsPristine();
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser un audio mp3 o wav'});
        return;
      }
      this.audios.push(evento.target.files[0]);
      this.nomaudios.push(nombre);
      console.log("Nombre audios: ", this.nomaudios);
    }
  }

  //Funciones para si se quiere quitar algun contenido

  quitarImagen(num){
    this.imagenes.splice(num,1);
    this.nomimagenes.splice(num,1);
  }

  quitarVideo(num){
    this.videos.splice(num,1);
    this.nomvideos.splice(num,1);
  }

  quitarDocumentos(num){
    this.documentos.splice(num,1);
    this.nomdocumentos.splice(num,1);
  }

  quitarAudio(num){
    this.audios.splice(num,1);
    this.nomaudios.splice(num,1);
  }



  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.formSubmited;
  }

}
