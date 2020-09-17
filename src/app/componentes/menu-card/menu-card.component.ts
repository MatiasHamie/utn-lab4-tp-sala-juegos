import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  usuarioConectado$: Observable<any> = this.firebase.afAuth.user;

  constructor(private firebase: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
  }
  // Juego(tipo: string) {
  //   switch (tipo) {
  //     case 'Adivina':
  //         this.router.navigate(['/Juegos/Adivina']);
  //       break;
  //     case 'Agilidad':
  //         this.router.navigate(['/Juegos/Agilidad']);
  //       break;
  //     case 'AdivinaMasListado':
  //         this.router.navigate(['/Juegos/AdivinaMasListado']);
  //       break;
  //     case 'AgilidadaMasListado':
  //         this.router.navigate(['/Juegos/AgilidadaMasListado']);
  //       break;
  //   }
  // }
}
