import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';
import { SwiperComponent } from "swiper/angular";
// import SwiperCore y los modulos requeridos
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y, EffectCoverflow  } from 'swiper';

SwiperCore.use([EffectCoverflow, Pagination]);

@Component({
  selector: 'detallestrabajo',
  templateUrl: './detallestrabajo.component.html',
  styleUrls: ['./detallestrabajo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetallestrabajoComponent implements OnInit {

  private uid: string = '';
  public loading = true;
  public trabajo;

  config: SwiperOptions = {
    effect:'coverflow',
    grabCursor:true,
    centeredSlides:true,
    slidesPerView:'auto',
    coverflowEffect:{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

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
          this.trabajo = res['trabajos'];
          this.loading=false;
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
  }

  crearImagenUrl(imagen: string) {
    return this.TrabajosService.crearImagenUrl(imagen);
  }

}
