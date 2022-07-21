import { Component, ViewEncapsulation, OnInit,NgZone, AfterContentInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';
//SANITIZER
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



import { SwiperComponent } from "swiper/angular";
// import SwiperCore y los modulos requeridos
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y, EffectCoverflow  } from 'swiper';

SwiperCore.use([EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]);

declare const gapi:any;

@Component({
  selector: 'detallestrabajo',
  templateUrl: './detallestrabajo.component.html',
  styleUrls: ['./detallestrabajo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetallestrabajoComponent implements OnInit {

  @ViewChild('closeAddExpenseModal') public closeAddExpenseModal: ElementRef;

  private uid: string = '';
  public loading = true;
  public trabajo;
  public titulotrabajo: boolean = true;

  //ATRIBUTOS Google Identification
  public formSubmint = false;
  public waiting = false;
  public auth2: any;

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
    navigation:true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private TrabajosService: TrabajosService,
              private sanitizer: DomSanitizer,
              private zone: NgZone) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.params['uid'];
    console.log("UID: ", this.uid);
    this.cargarTrabajo();
  }


  cargarTrabajo(){
    this.loading = true;
    this.TrabajosService.obtenerTrabajoVisible(this.uid)
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

  //Para cargar la imagen del trabajo
  crearImagenUrl(trabajo) {
    let img=this.TrabajosService.crearImagenUrl(trabajo.imagen);
    if(img=='nofoto'){
      img= this.crearImagenTitu(trabajo.area);
    }
    return img;
  }

  //Para cargar la imagen del trabajo
  crearImagenTitu(area) {
    const r = Math.ceil(Math.random()*(4-1) + 1); // numero aleatorio del 1 al 4
    let urlfoto='';
    if(area == "Construcción"){
      urlfoto= '../../../../assets/img/construccion/'+r+'.jpg'
    }
    if(area == "Tecnologías de la información y las comunicaciones"){
      urlfoto= '../../../../assets/img/tecnoinfocom/'+r+'.jpg'
    }
    if(area == "Ciencia y tecnologías para la salud" || area == "Ciencia de la salud"){
      urlfoto= '../../../../assets/img/cienciassalud/'+r+'.jpg'
    }
    if(area == "Industrial y aeronáutica"){
      urlfoto= '../../../../assets/img/industrialaero/'+r+'.jpg'
    }
    return urlfoto;

  }

  crearContenidosUrl(imagen: string) {
    return this.TrabajosService.crearContenidosUrl(imagen);
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}

// Para votar

// startApp() {
//   gapi.load('auth2', ()=>{
//     // Retrieve the singleton for the GoogleAuth library and set up the client.
//     this.auth2 = gapi.auth2.init({
//       client_id: '826053114073-g8rqruj8i8bl3gubhrlfa3juc27ffkrn.apps.googleusercontent.com',
//       cookiepolicy: 'single_host_origin',
//     });
//     this.attachSignin(document.getElementById('my-signin2'));
//   });
// };

// attachSignin(element) {
//   if(element!=null){
//     this.auth2.attachClickHandler(element, {},
//     (googleUser) => {
//       var id_token = googleUser.getAuthResponse().id_token;
//       this.closeAddExpenseModal.nativeElement.click();
//       this.TrabajosService.loginGoogle(id_token)
//         .subscribe( res => {
//           this.zone.run(() => {
//             this.router.navigateByUrl('/admin/dashboard');
//           });
//         }, (err) => {
//           console.warn('Error respueta api:',err);
//           Swal.fire({
//             title: 'Error!',
//             text: err.error.msg || 'No pudo completarse la acción, vuelva a intentarlo más tarde',
//             icon: 'error',
//             confirmButtonText: 'Ok',
//             allowOutsideClick: false
//           });
//         }
//         );
//     }, (error) => {
//       alert(JSON.stringify(error, undefined, 2));
//     });
//   }
// }

onSignIn(googleUser) {
  console.log("entro");
  var profile = googleUser.getBasicProfile();
  console.log("Profile: ", profile);
}


}
