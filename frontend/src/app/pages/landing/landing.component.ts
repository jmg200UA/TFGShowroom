import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TitulacionService } from '../../services/titulacion.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css',
              '../../../assets/css/slide/slide.css']
})
export class LandingComponent implements OnInit {

  public rol="";

  //Variables para la carga de titulaciones
  public listaTitulaciones;
  public loading = true;
  public listatitu: boolean = true;

  constructor(private UsuarioService: UsuarioService,
              private router: Router,
              private TitulacionService: TitulacionService) { }

  ngOnInit(): void {
    //this.rol= this.UsuarioService.rol;
    this.router.navigateByUrl('/landing/inicio');
    this.cargarTitulaciones();
  }

  logout() {
    this.UsuarioService.logout();
  }

  //cargamos las titulaciones
  cargarTitulaciones() {
    this.loading = true;
    this.TitulacionService.cargarTitulacionesTodo()
      .subscribe( res => {
          this.listaTitulaciones = res['titulaciones'];
          this.loading = false;
        }, (err) => {
          Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
          this.loading = false;
        });
    }

  //Para cargar la imagen de la titulacion
  crearUrlTitulacion(imagen:string){
    return this.TitulacionService.crearImagenUrl(imagen);
  }


  cambiotitu(){
    if(this.listatitu) this.listatitu= false;
    else this.listatitu = true;
    console.log(this.listatitu);
  }

  busqueda(){
    let texto= (document.getElementById("txtQuery") as HTMLInputElement).value;
    console.log("TExto: ", texto);
    // this.router.navigate(['/landing/busqueda/',texto]);
    this.router.navigateByUrl('/landing/busqueda/'+ texto);
  }



}
