import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.scss']
})
export class PptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  puntajeUsuario = 0;
  puntajePC = 0;
  eleccionUsuario: string; //which weapon user selected
  eleccionPC: string; //which weapon computer selected
  resultadoFinal: string; //whether user weapon beats or perdios to computer
  estadoPartida: string; //whether it's a win or perdio
  opciones = [ 'Piedra', 'Papel', 'Tijera' ];

  userPick(armaElegidaUsuario: string): void {
    this.eleccionUsuario = armaElegidaUsuario;
    console.log( this.eleccionUsuario);
    setTimeout( () => {
      const indiceRandom = Math.floor(Math.random() * 3);
      this.eleccionPC = this.opciones[indiceRandom];
      console.log(this.eleccionPC);
      this.checkResult();
    }, 1000);
  }

  clearField() {
    setTimeout(() => {
      this.estadoPartida = '';
      this.eleccionUsuario = '';
      this.eleccionPC = '';
    }, 1500);
  }

  gano(usuario, pc) {
    this.puntajeUsuario ++;
    this.eleccionUsuario = usuario;
    this.eleccionPC = pc;
    this.resultadoFinal = 'Vencio con';
    this.estadoPartida = 'Ganaste!';
    this.clearField();
  }


  perdio(usuario, pc) {
    this.puntajePC ++;
    this.eleccionUsuario = usuario;
    this.eleccionPC = pc;
    this.resultadoFinal = 'Perdio con';
    this.estadoPartida = 'Perdiste!';
    this.clearField();
  }

  empato(usuario, pc) {
    this.eleccionUsuario = usuario;
    this.eleccionPC = pc;
    this.resultadoFinal = 'y';
    this.estadoPartida = 'Empataste!';
    this.clearField();
  }

  checkResult() {
    // const userChoice = this.eleccionUsuario;
    // const compChoice = this.eleccionPC;
    switch (this.eleccionUsuario + this.eleccionPC) {
      case 'PiedraTijera':
      case 'PapelPiedra':
      case 'TijeraPapel':
        this.gano(this.eleccionUsuario, this.eleccionPC);
        break;
      case 'PiedraPapel':
      case 'TijeraPiedra':
      case 'PapelTijera':
        this.perdio(this.eleccionUsuario, this.eleccionPC);
        break;
      default:
        this.empato(this.eleccionUsuario, this.eleccionPC);
        break;
    }

  }
}
