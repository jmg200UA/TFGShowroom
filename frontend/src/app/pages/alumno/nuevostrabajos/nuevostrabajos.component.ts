import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TrabajosService } from '../../../services/trabajos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Trabajo } from '../../../models/trabajo.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nuevostrabajos',
  templateUrl: './nuevostrabajos.component.html',
  styleUrls: ['./nuevostrabajos.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class NuevostrabajosComponent implements OnInit {

  public loading = true;

  public totaltrabajos = 0;
  public posicionactual = 0;
  public registrosporpagina = environment.registros_por_pagina;

  private ultimaBusqueda = '';
  public listaTrabajos: Trabajo[] = [];

  //Variable para ofrecer feedback del trabajo seleccionado
  public trabajofeed;
  public loadingfeed = true;

  showNavigationArrows = false;

  constructor(private TrabajosService: TrabajosService,
              private UsuarioService:UsuarioService,
              private router: Router,
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
    this.cargarTrabajos(this.ultimaBusqueda);
  }

  cargarTrabajos( textoBuscar: string ) {
    this.ultimaBusqueda = textoBuscar;
    this.loading = true;
    this.TrabajosService.cargarTrabajosAluNoVisibles( this.UsuarioService.uid,this.posicionactual, textoBuscar )
      .subscribe( res => {
        // Obtenemos los trabajos del alumno que han sido aceptados por el editor y por lo tanto publicados
        console.log("LA RES de trabajos: ", res['trabajos']);
        if (res['trabajos'].length === 0) {
          if (this.posicionactual > 0) {
            this.posicionactual = this.posicionactual - this.registrosporpagina;
            if (this.posicionactual < 0) { this.posicionactual = 0};
            this.cargarTrabajos(this.ultimaBusqueda);
          } else {
            this.listaTrabajos = [];
            this.totaltrabajos = 0;
          }
        } else {
          this.listaTrabajos = res['trabajos'];
          this.totaltrabajos = res['page'].total;
        }
        this.loading = false;
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
  }

  cambiarPagina( pagina: number ){
    pagina = (pagina < 0 ? 0 : pagina);
    this.posicionactual = ((pagina - 1) * this.registrosporpagina >=0 ? (pagina - 1) * this.registrosporpagina : 0);
    this.cargarTrabajos(this.ultimaBusqueda);
  }

  subirTrabajo(id){
    this.router.navigateByUrl('/alumno/subirtrabajo/'+id);
  }

  subirContenidos(id){
    this.router.navigateByUrl('/alumno/subircontenidos/'+id);
  }

  clickFeedback(trabajo){
    this.trabajofeed=trabajo;
    this.loadingfeed = false;
    console.log("trabajofeed: ", this.trabajofeed);
  }

}
