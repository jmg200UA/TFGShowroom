import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';

@Component({
  selector: 'actualizartrabajo',
  templateUrl: './actualizartrabajo.component.html',
  styleUrls: ['./actualizartrabajo.component.css']
})
export class ActualizartrabajoComponent implements OnInit {

  public imagenUrl;
  public foto: File = null;
  private formSubmited = false;
  private uid: string = '';
  public showOKP: boolean = false;
  public tipo : string = '';
  public fileText = 'Seleccione imagen';
  public loading = true;

  public datosForm = this.fb.group({
    //Ya registrados, pero para mostrar
    titulo: [''],
    autor: [''],
    area: [''],
    titulacion: [''],
    tipo: [''],
    //********************** */
    resumen: ['', Validators.required ],
    imagen: [''],
    director: ['', Validators.required ],
    estado: [''], // cambiar a revisión por los editores

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
    this.datosForm.get('estado').setValue('Pendiente de revisión');
    //Llamar a actualizar trabajo
    //Hacer bucle para cada array de archivos para subirlos uno a uno
      this.TrabajosService.actualizarTrabajo( this.uid,this.datosForm.value )
        .subscribe( res => {
          console.log("Trabajo creado: ", res['trabajo']);
          //Borramos el contenido multimedia que tuviese previamente el trabajo
          this.TrabajosService.limpiarMultimediaTrabajo(this.uid)
            .subscribe( res => {
              console.log("Respuesta limpieza multimedia: ", res);
            }, (err) => {
              const errtext = err.error.msg || 'No se pudo realizar la limpieza';
              Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
              return;
            });
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
          this.datosForm.get('autor').setValue(res['trabajos'].autor.nombre_apellidos);
          this.datosForm.get('area').setValue(res['trabajos'].area);
          this.datosForm.get('titulacion').setValue(res['trabajos'].titulacion.nombre);
          this.datosForm.get('tipo').setValue(res['trabajos'].tipo);
          this.imagenUrl = this.TrabajosService.crearImagenUrl(res['trabajos'].imagen);


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
      this.fileText = nombre;
      let reader = new FileReader();
      // cargamos el archivo en la variable foto que servirá para enviarla al servidor
      this.foto = evento.target.files[0];
      // leemos el archivo desde el dispositivo
      reader.readAsDataURL(evento.target.files[0]);
      // y cargamos el archivo en la imagenUrl que es lo que se inserta en el src de la imagen
      reader.onload = (event) => {
        this.imagenUrl = event.target.result.toString();
        this.fileText = nombre;
      };
    }
  }

  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.formSubmited;
  }

}
