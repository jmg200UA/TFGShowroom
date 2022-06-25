import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css',
              '../../../assets/css/slide/slide.css']
})
export class LandingComponent implements OnInit {

  public rol="";

  constructor(private UsuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    //this.rol= this.UsuarioService.rol;
    this.router.navigateByUrl('/landing/inicio');
  }

  logout() {
    this.UsuarioService.logout();
  }

}
