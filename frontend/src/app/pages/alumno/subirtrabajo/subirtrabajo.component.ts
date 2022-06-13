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



  public datosForm = this.fb.group({
    //Ya registrados, pero para mostrar
    titulo: ['', Validators.required ],
    autor: ['', Validators.required ],
    area: ['', Validators.required ],
    titulacion: ['', Validators.required ],
    //********************** */
    resumen: ['', Validators.required ],
    imagen: [''],
    director: ['', Validators.required ],
    //Contenido multimedia que quiera adjuntar el alumno
    imagenes: [''],
    videos: [''],
    audios: [''],
    documentos: [''],

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
      // this.TitulacionService.nuevaTitulacion( this.datosForm.value )
      //   .subscribe( res => {
      //     console.log("Titulacion creada: ", res['titulacion']);
      //     if (this.foto ) {
      //       this.TitulacionService.subirFoto( res['titulacion'].uid, this.foto)
      //       .subscribe( res => {
      //         console.log("Respuesta a la subida de la foto: ", res);
      //       }, (err) => {
      //         const errtext = err.error.msg || 'No se pudo cargar la imagen';
      //         Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
      //         return;
      //       });
      //     }

      //     this.datosForm.markAsPristine();

      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Titulacion creada correctamente',
      //       showConfirmButton: false,
      //       timer: 2000
      //     })
      //     this.router.navigateByUrl('/admin/titulaciones');

      //   }, (err) => {
      //     const errtext = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo.';
      //     Swal.fire({icon: 'error', title: 'Oops...', text: errtext,});
      //     return;
      //   });


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



  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.formSubmited;
  }

}
