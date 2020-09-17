import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  // usuarioConectado: any;
  usuarioConectado$: Observable<any> = this.firebase.afAuth.user;
  estaLogeado: boolean;

  constructor(private firebase: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuarioConectado$.subscribe(usuario => {
      this.estaLogeado = (usuario) ? true : false;
      console.log(this.estaLogeado);
    })
  }

  logout(){
    this.firebase.logout();
    // this.estaLogeado = false;
    // console.log(this.estaLogeado);
    this.router.navigate(['/Principal']);
  }

}
