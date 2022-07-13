import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';
import { Trabajo } from '../../../models/trabajo.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public texto: string = '';
  public loading = true;

  public totaltrabajos = 0;
  public posicionactual = 0;
  public registrosporpagina = environment.registros_por_pagina;

  private ultimaBusqueda = '';
  public listaTrabajos: Trabajo[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private TrabajosService: TrabajosService) { }

  ngOnInit(): void {
    this.texto = this.route.snapshot.params['texto'];
    console.log("Texto: ", this.texto);
    this.cargarTrabajos();
  }

  cargarTrabajos() {
    this.ultimaBusqueda = this.texto;
      this.loading = true;
      this.TrabajosService.cargarTrabajosVisibles( this.posicionactual, this.texto )
      .subscribe( res => {
        console.log("Res trabajos: ", res['trabajos']);
        if (res['trabajos'].length === 0) {
          if (this.posicionactual > 0) {
            this.posicionactual = this.posicionactual - this.registrosporpagina;
            if (this.posicionactual < 0) { this.posicionactual = 0};
            this.cargarTrabajos();
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
        this.loading = false;
      });
  }

}
