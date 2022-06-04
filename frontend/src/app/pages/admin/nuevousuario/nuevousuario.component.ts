import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {


  private formSubmited = false;
  private uid: string = '';
  public enablepass: boolean = true;
  public showOKP: boolean = false;

  public datosForm = this.fb.group({
    uid: [{value: 'nuevo', disabled: true}, Validators.required],
    email: [ '', [Validators.required, Validators.email] ],
    nombre_apellidos: ['', Validators.required ],
    password: ['', Validators.required ],
    rol: ['ROL_FISIO', Validators.required ],
    activo: [true, Validators.required ],
  });

  public nuevoPassword = this.fb.group({
    password: ['', Validators.required],
    nuevopassword: ['', Validators.required],
    nuevopassword2: ['', Validators.required],
  });

  constructor( private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
  // recogemos el parametro
    this.uid = this.route.snapshot.params['uid'];
    this.datosForm.get('uid').setValue(this.uid);
    // if (this.uid !== 'nuevo') {
    //   this.usuarioService.cargarUsuario(this.uid)
    //     .subscribe( res => {
    //       if (!res['usuarios']) {
    //         this.router.navigateByUrl('/admin/usuarios');
    //         return;
    //       };
    //       this.cargaDatosForm(res);
    //     }, (err) => {
    //       this.router.navigateByUrl('/admin/usuarios');
    //       Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
    //       return;
    //     });
    // }
  }

  nuevo(): void {
    this.formSubmited = false;
    this.datosForm.reset();
    this.nuevoPassword.reset();
    this.showOKP = false;
    this.datosForm.get('uid').setValue('nuevo');
    this.datosForm.get('rol').setValue('ROL_CLIENTE');
    this.datosForm.get('activo').setValue(true);
    this.datosForm.get('password').enable();
    this.enablepass = true;
    this.router.navigateByUrl('/admin/usuarios/usuario/nuevo');
  }

  esnuevo(): boolean {
    if (this.datosForm.get('uid').value==='nuevo') return true;
    return false;
  }

  cargaDatosForm( res: any): void {
    this.datosForm.get('uid').setValue(res['usuarios'].uid);
    this.datosForm.get('nombre_apellidos').setValue(res['usuarios'].nombre_apellidos);
    //this.datosForm.get('apellidos').setValue(res['usuarios'].apellidos);
    this.datosForm.get('email').setValue(res['usuarios'].email);
    this.datosForm.get('rol').setValue(res['usuarios'].rol);
    //this.datosForm.get('activo').setValue(res['usuarios'].activo);
    this.datosForm.get('password').setValue('1234');
    this.datosForm.get('password').disable();
    this.enablepass = false;
    this.datosForm.markAsPristine();
  }

  cancelar(): void {
    // Si estamos creando uno nuevo, vamos a la lista
      this.router.navigateByUrl('/admin/dashboard');
  }


  enviar(): void {
    this.formSubmited = true;
    if (this.datosForm.invalid) { return; }

      // this.usuarioService.nuevoUsuario( this.datosForm.value )
      //   .subscribe( res => {
      //     this.datosForm.get('uid').setValue(res['usuario'].uid);
      //     this.datosForm.get('password').disable();
      //     this.enablepass = false;
      //     this.datosForm.markAsPristine();

      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Usuario creado correctamente',
      //       showConfirmButton: false,
      //       timer: 2000
      //     })
      //     this.router.navigateByUrl('/admin/usuarios');

      //   }, (err) => {
      //     const errtext = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo.';
      //     Swal.fire({icon: 'error', title: 'Oops...', text: errtext,});
      //     return;
      //   });


  }

  cambiarPassword(){
    // ponemos el mismo valor en los tres campos
    const data = {
      password : this.datosForm.get('password').value,
      nuevopassword: this.nuevoPassword.get('nuevopassword').value,
      nuevopassword2: this.nuevoPassword.get('nuevopassword2').value
    };
    // this.usuarioService.cambiarPassword( this.datosForm.get('uid').value, data)
    //   .subscribe(res => {
    //     this.nuevoPassword.reset();
    //     this.showOKP = true;
    //   }, (err)=>{
    //     const errtext = err.error.msg || 'No se pudo completar la acción, vuelva a intentarlo.';
    //     Swal.fire({icon: 'error', title: 'Oops...', text: errtext});
    //     return;
    //   });
  }

  campoNoValido( campo: string) {
    return this.datosForm.get(campo).invalid && this.formSubmited;
  }

}



