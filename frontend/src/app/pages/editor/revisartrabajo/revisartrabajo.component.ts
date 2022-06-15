import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'revisartrabajo',
  templateUrl: './revisartrabajo.component.html',
  styleUrls: ['./revisartrabajo.component.css'],
  providers: [NgbCarouselConfig]
})
export class RevisartrabajoComponent implements OnInit {

  private uid: string = '';
  public loading = true;

  //Arrays para cargar los contenidos multimedia
  public imagenes: String [] = [];
  public videos: String [] = [];
  public audios: String [] = [];
  public documentos: String [] = [];

  public datosForm = this.fb.group({ // para mostrar los contenidos del trabajo
    titulo: [''],
    autor: [''],
    area: [''],
    titulacion: [''],
    tipo: [''],
    //********************** */
    resumen: [''],
    imagen: [''],
    director: [''],
    estado: [''],

  });

  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private TrabajosService: TrabajosService,
    private config: NgbCarouselConfig) {
      //Customizacion valores carrusel
      config.interval = 1000000;
        //config.wrap = false;
        config.keyboard = true;
        config.pauseOnHover = false;
        config.showNavigationIndicators = false;
        config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }


ngOnInit(): void {
this.uid = this.route.snapshot.params['uid'];
console.log("UID: ", this.uid);
this.cargarTrabajo();
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
        this.datosForm.get('director').setValue(res['trabajos'].director);
        this.datosForm.get('director').disable();
        this.datosForm.get('resumen').setValue(res['trabajos'].resumen);
        this.datosForm.get('resumen').disable();

        this.imagenes = res['trabajos'].imagenes;
        this.videos = res['trabajos'].videos;
        this.documentos = res['trabajos'].documentos;
        this.audios = res['trabajos'].audios;


    }, (err) => {
      Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
      //console.warn('error:', err);
      this.loading = false;
    });
}

//Funciones para cargar los archivos
crearImagenUrl(imagen: string) {
  return this.TrabajosService.crearImagenUrl(imagen);
}

crearImagenesUrl(imagen: string) {
  return this.TrabajosService.crearImagenesUrl(imagen);
}

crearVideoUrl(video: string) {
  return this.TrabajosService.crearVideoUrl(video);
}

crearDocUrl(doc: string) {
  return this.TrabajosService.crearDocUrl(doc);
}

crearAudioUrl(audio: string) {
  return this.TrabajosService.crearAudioUrl(audio);
}

}
