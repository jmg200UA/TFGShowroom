import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import {Usuario} from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private UsuarioService: UsuarioService) { }

  public loading = true;
  public usuario: Usuario;
  public rol = this.UsuarioService.rol;

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.loading = true;
    this.UsuarioService.cargarUsuario(this.UsuarioService.uid)
      .subscribe( res => {
        this.usuario = res['usuarios'];
        console.log("Usuario: ", res['usuarios']);
        this.loading = false;
      }, (err) => {
        Swal.fire({icon: 'error', title: 'Oops...', text: 'No se pudo completar la acción, vuelva a intentarlo',});
        //console.warn('error:', err);
        this.loading = false;
      });
  }

}
