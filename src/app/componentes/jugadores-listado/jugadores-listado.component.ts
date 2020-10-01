import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';
import { Jugador } from '../../clases/jugador';
// import { JugadoresService } from '../../servicios/jugadores.service';
import { ListaJugadoresService } from "../../servicios/firebase/lista-jugadores.service";
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit, OnDestroy {

  listaTodosLosJugadores: Jugador[];
  traerTodosLosJugadores$: Subscription;

  constructor(private serviceJugadores: ListaJugadoresService) {
  }

  ngOnInit() {
    this.TraerTodos();
  }

  ngOnDestroy(){
    this.traerTodosLosJugadores$.unsubscribe();
  }

  TraerTodos(){
    this.traerTodosLosJugadores$ = this.serviceJugadores.getAllPlayers().subscribe((data: Jugador[]) => {
      this.listaTodosLosJugadores = data;
    });
  }
}
