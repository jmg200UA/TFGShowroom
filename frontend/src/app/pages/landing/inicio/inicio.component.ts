import { Component, ElementRef, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { TrabajosService } from '../../../services/trabajos.service';
import { Trabajo } from '../../../models/trabajo.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SwiperComponent } from "swiper/angular";
// import SwiperCore y los modulos requeridos
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y  } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InicioComponent implements OnInit {

  //Variables para la carga de los trabajos
  public loading = true;
  public totaltrabajos = 0;
  public listaTrabajos;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  };
  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }


  constructor(private trabajoService: TrabajosService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarTrabajos();
  }

  cargarTrabajos() { // realizamos la carga de los trabajos registrados para mostrar
    this.loading = true;
    this.trabajoService.cargarTrabajosTodo()
      .subscribe( res => {
        console.log("Res de trabajos", res['trabajos']);
          this.listaTrabajos = res['trabajos'];
          this.totaltrabajos = res['page'].total;
        this.loading = false;
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
    }

    crearImagenUrl(imagen: string) {
      return this.trabajoService.crearImagenUrl(imagen);
    }

    irFicha(uid){
      this.router.navigateByUrl('/landing/trabajo/'+ uid);
    }

  }
