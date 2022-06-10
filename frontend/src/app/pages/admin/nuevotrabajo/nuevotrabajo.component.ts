import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../../../src/app/models/usuario.model';

@Component({
  selector: 'nuevotrabajo',
  templateUrl: './nuevotrabajo.component.html',
  styleUrls: ['./nuevotrabajo.component.css']
})
export class NuevotrabajoComponent implements OnInit {


  private formSubmited = false;
  private uid: string = '';
  public showOKP: boolean = false;


  public datosForm = this.fb.group({
    autor: ['', Validators.required ], // hacer peticion a la BD para sacar en un desplegable todos los usuarios con ROL_ALUMNO
    titulo: ['', Validators.required ],
    titulacion: ['', Validators.required ],
  });
  //para cargar lista alumnos
  public loading = false;

  public totalalumnos = 0;
  public posicionactual = 0;
  public registrosporpagina = environment.registros_por_pagina;

  public ultimaBusqueda = '';
  public listaAlumnos: Usuario[] = [];
  public nombreAlu: string = ''; // nombre alumno seleccionado en la select

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private TrabajosService: TrabajosService,
              private UsuarioService: UsuarioService) { }

  ngOnInit(): void {
    //this.cargarAlumnos(this.ultimaBusqueda);
  }



  cancelar(): void {
    // Si estamos creando uno nuevo, vamos a la lista
      this.router.navigateByUrl('/admin/trabajos');
  }

  enviar(): void {
    this.formSubmited = true;
    if (this.datosForm.invalid) { return; }

      this.TrabajosService.nuevoTrabajo( this.datosForm.value )
        .subscribe( res => {
          this.datosForm.markAsPristine();

          Swal.fire({
            icon: 'success',
            title: 'Trabajo creado correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigateByUrl('/admin/trabajos');

        }, (err) => {
          const errtext = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo.';
          Swal.fire({icon: 'error', title: 'Oops...', text: errtext,});
          return;
        });


  }

  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.formSubmited;
  }

  // BUSQUEDA ALUMNOS
  cargarAlumnos( textoBuscar: string ) {
    this.ultimaBusqueda = textoBuscar;
    console.log("Texto busqueda: ", this.ultimaBusqueda);
    if(this.ultimaBusqueda.length>2){
      this.loading = true;
      this.UsuarioService.cargarAlumnos( this.posicionactual, textoBuscar )
      .subscribe( res => {
        // Lo que nos llega lo asignamos a lista usuarios para renderizar la tabla
        // Comprobamos si estamos en un apágina vacia, si es así entonces retrocedemos una página si se puede

        if (res['alumnos'].length === 0) {
          if (this.posicionactual > 0) {
            this.posicionactual = this.posicionactual - this.registrosporpagina;
            if (this.posicionactual < 0) { this.posicionactual = 0};
            this.cargarAlumnos(this.ultimaBusqueda);
          } else {
            this.listaAlumnos = [];
            this.totalalumnos = 0;
          }
        } else {
          this.listaAlumnos = res['alumnos'];
          this.totalalumnos = res['page'].total;
        }
        console.log("Total alus: ", res['page'].total);
        this.loading = false;
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
    }

  }

  esteLugar( alu ) {
    this.nombreAlu = alu.nombre_apellidos;
    this.datosForm.get('autor').setValue(alu.uid);
    this.ultimaBusqueda='';
  }

}
