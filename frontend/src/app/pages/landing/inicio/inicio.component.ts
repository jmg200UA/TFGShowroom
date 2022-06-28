import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { TrabajosService } from '../../../services/trabajos.service';
import { Trabajo } from '../../../models/trabajo.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css',
              "../../../../../node_modules/keen-slider/keen-slider.min.css"]
})
export class InicioComponent implements OnInit {

  //Variables para la carga de los trabajos
  public loading = true;
  public totaltrabajos = 0;
  public listaTrabajos;


  constructor(private trabajoService: TrabajosService) { }

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


}
