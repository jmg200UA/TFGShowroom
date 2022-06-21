import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';

@Component({
  selector: 'subircontenidos',
  templateUrl: './subircontenidos.component.html',
  styleUrls: ['./subircontenidos.component.css']
})
export class SubircontenidosComponent implements OnInit {

  public contenidos;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private TrabajosService: TrabajosService) { }

  ngOnInit(): void {
  }

  cambioContenido( evento ): void {
    if (evento.target.files && evento.target.files[0]) {
      // Comprobamos si es una imagen jpg, jpet, png
      const extensiones = ['jpeg','jpg','png','PNG'];
      const nombre: string = evento.target.files[0].name;
      const nombrecortado: string[] = nombre.split('.');
      const extension = nombrecortado[nombrecortado.length - 1];
      if (!extensiones.includes(extension)) {
        // Si no teniamos ningúna foto ya seleccionada antes, dejamos el campo pristine
          //this.datosForm.get('imagenes').markAsPristine();
        Swal.fire({icon: 'error', title: 'Oops...', text: 'El archivo debe ser una imagen jpeg, jpg o png'});
        return;
      }
      this.contenidos.push(evento.target.files[0]);
      //this.nomimagenes.push(nombre);
      //mirar arrays con campos proyecto
    }
  }

}
