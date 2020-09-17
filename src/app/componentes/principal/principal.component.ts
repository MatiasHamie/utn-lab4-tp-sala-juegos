import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

 usuarioConectado$: Observable<any> = this.firebase.afAuth.user;

 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor(private firebase: AuthService) {  }

  ngOnInit() {
  }



}
