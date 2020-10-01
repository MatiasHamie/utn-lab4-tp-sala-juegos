
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ListaJugadoresService } from '../../servicios/firebase/lista-jugadores.service';
import { JuegoAdivina } from '../../clases/juego-adivina'

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnDestroy {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  ngOnDestroy() {
    this.serviceJugadores.updatePlayer();
    console.log('Se llamo al onDestroy');
  }

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;

  constructor(private serviceJugadores: ListaJugadoresService) {
    this.nuevoJuego = new JuegoAdivina();
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
  }

  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;
    console.info("numero Secreto:", this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {

      this.enviarJuego.emit(this.nuevoJuego);
      this.MostrarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;

    } else {

      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = "Dificil acertar de una, segui intentando";
          break;
        case 2:
          mensaje = "Complicado, segundo error";
          break;
        case 3:
          mensaje = "A veces la tercera es la vencida, otras no";
          break;
        case 4:
          mensaje = "No! No era el,  " + this.nuevoJuego.numeroIngresado;
          break;
        case 5:
          mensaje = "Ya lo vas a adivinar, segui!";
          break;
        case 6:
          mensaje = "Afortunado en el amor";
          break;

        default:
          mensaje = "Te equivocaste " + this.contador + " veces";
          break;
      }
      this.MostrarMensaje("#" + this.contador + " " + mensaje + " ayuda :" + this.nuevoJuego.retornarAyuda());


    }
    console.info("numero Secreto:", this.nuevoJuego.gano);
  }

  MostrarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
    this.Mensajes = mensaje;

    var x = document.getElementById("snackbar");
    if (ganador) {
      x.className = "show Ganador";
      this.serviceJugadores.gano();
    } else {
      x.className = "show Perdedor";
      this.serviceJugadores.perdio();
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info("objeto", x);
  }

}
