import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajosService } from '../../../services/trabajos.service';

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
    director: ['', Validators.required ],
    tipo: ['', Validators.required ],
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private TrabajosService: TrabajosService) { }

  ngOnInit(): void {
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

}
