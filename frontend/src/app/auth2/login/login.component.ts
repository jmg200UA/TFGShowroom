import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const gapi:any;



@Component({
  selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  //ATRIBUTOS
  public formSubmint = false;
  public waiting = false;

  public auth2: any;

  public boolres = false; // booleano para cambiar el modal si se tiene que reestablecer la contraseña

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember: [ false || localStorage.getItem('email') ]
  });

  public respasForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email] ]
  });

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private router: Router,
                private zone: NgZone ) { }

  ngOnInit(): void {
  }



  login() {
    this.formSubmint = true;
    if (!this.loginForm.valid) {
      console.warn('Errores en le formulario');
      return;
    }
    this.waiting = true;

    //Entonces llegas aqui y llamas a login dentro de usuario service
    this.usuarioService.login( this.loginForm.value)
      .subscribe( res => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.waiting = false;
        this.closeAddExpenseModal.nativeElement.click();

        //Si rol_admin, te vas pa admin
        if (this.usuarioService.rol == 'ROL_ADMIN'){
          this.router.navigateByUrl('/admin/dashboard');

        //Pero si rol_fisio, te vas pa fisio
        }else if(this.usuarioService.rol == 'ROL_FISIO'){
          this.router.navigateByUrl('/fisio/dashboard');
        }


        else{
          this.router.navigateByUrl('/cliente/dashboard');
        }

      }, (err) => {
        console.warn('Error respueta api:',err);
        Swal.fire({
          title: 'Error!',
          text: err.error.msg || 'No pudo completarse la acción, vuelva a intentarlo más tarde',
          icon: 'error',
          confirmButtonText: 'Ok',
          allowOutsideClick: false
        });
        this.waiting = false;
      });
  }

  // respas(){
  //   //mandar correo para reestablecer password
  //   this.waiting = true;

  //   this.clienteService.envioCorreoReestablecer( this.respasForm.value)
  //     .subscribe( res => {
  //       Swal.fire({icon: 'success', title: 'Correo enviado a '+ this.respasForm.get('email').value});
  //       window.location.reload();
  //     }, (err) => {
  //       console.warn('Error respueta api:',err);
  //       Swal.fire({
  //         title: 'Error!',
  //         text: err.error.msg || 'No pudo completarse la acción, vuelva a intentarlo más tarde',
  //         icon: 'error',
  //         confirmButtonText: 'Ok',
  //         allowOutsideClick: false
  //       });
  //       this.waiting = false;
  //     });
  // }

  cambiarBool(bool){
    this.boolres=bool;
  }

  campoValido( campo: string) {
    return this.loginForm.get(campo).valid || !this.formSubmint;
  }


}
