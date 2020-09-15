import { Component, OnInit } from '@angular/core';

// Ejemplo tomado de material (ahi se le dice Tile (baldosa) a la interface)

//Falta ver si empatamos, q no quede con un loop infinito

export interface CuadradoGrilla {
  color: string;
  columnas: number;
  filas: number;
  texto: string;
}

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {

  turnoUsuario: boolean = true;
  ganoUsuario: boolean = false;
  ganoPC: boolean = false;

  // Lo que hace el tracker es ir guardando los espacios de la grilla
  // que estan ocupados, lo inicializo en null
  tracker: string[] = new Array(9).fill(null);

  cuadradosGrilla: CuadradoGrilla[] = [
    {texto: '', columnas: 1, filas: 1, color: 'lightgreen'},// 0
    {texto: '', columnas: 1, filas: 1, color: 'lightblue'},// 1
    {texto: '', columnas: 1, filas: 1, color: 'lightgrey'},// 2
    {texto: '', columnas: 1, filas: 1, color: '#DDBDF1'},// 3
    {texto: '', columnas: 1, filas: 1, color: 'ligthorange'},// 4
    {texto: '', columnas: 1, filas: 1, color: 'lightgreen'},// 5
    {texto: '', columnas: 1, filas: 1, color: 'lightyellow'},// 6
    {texto: '', columnas: 1, filas: 1, color: 'lightpink'},// 7
    {texto: '', columnas: 1, filas: 1, color: 'lightblue'}// 8
  ];

  constructor() { }

  ngOnInit(): void {
  }

  usuarioColocaLaX(indice: number): void {
    //Si el punto donde quiere poner el usuario la 'X' es null
    // y si no gano nadie
    if (this.tracker[indice] == null && !this.ganoUsuario && !this.ganoPC) {
      this.tracker[indice] = 'X'; //Escribo una X en el tracker (todavia no en la grilla)
      this.cuadradosGrilla[indice].texto = 'X'; //Pongo la X en el cuadrado de la grilla En el indice del tracker
      this.ganoUsuario = this.verSiAlguienGano(); //Ya que pongo la X me fijo si alguien gano
      this.turnoUsuario = false; //el turno termino
      if(!this.ganoUsuario){ //Si no gano el usuario, me fijo el movimiento de la PC aleatorio
        this.verSiguienteMovimientoPC();
        this.ganoPC = this.verSiAlguienGano(); //Otra ves me fijo si alguien gano
        if(this.ganoPC){ // Si gano la pc, el turno termino (solo tema de titulo del html)
          this.turnoUsuario = false;
        }
      }
    }
  }

  /*
    La grilla es
    0 1 2
    3 4 5
    6 7 8

    Entonces comparo cada vez que hay un movimiento si alguno gano
    PERO verificando que no sea null cada grilla, porque si no puede haber 3 null iguales
  */
  verSiAlguienGano(): boolean{
    if(
      (this.tracker[0] != null && this.tracker[0] == this.tracker[1] && this.tracker[0] == this.tracker[2]) ||
      (this.tracker[3] != null && this.tracker[3] == this.tracker[4] && this.tracker[3] == this.tracker[5]) ||
      (this.tracker[6] != null && this.tracker[6] == this.tracker[7] && this.tracker[6] == this.tracker[8]) ||
      (this.tracker[0] != null && this.tracker[0] == this.tracker[3] && this.tracker[0] == this.tracker[6]) ||
      (this.tracker[1] != null && this.tracker[1] == this.tracker[4] && this.tracker[1] == this.tracker[7]) ||
      (this.tracker[2] != null && this.tracker[2] == this.tracker[5] && this.tracker[2] == this.tracker[8]) ||
      (this.tracker[0] != null && this.tracker[0] == this.tracker[4] && this.tracker[0] == this.tracker[8]) ||
      (this.tracker[2] != null && this.tracker[2] == this.tracker[4] && this.tracker[2] == this.tracker[6])
      )
      {
      return true;
    }
    return false;
  }

  verSiguienteMovimientoPC(): void{
    let pcYaPusoCirculo = false;

    while(!pcYaPusoCirculo){

      let posibleIndiceParaMoverPC = Math.floor(Math.random() * 9);
      console.log(Math.floor(Math.random() * 9));

      if(this.tracker[posibleIndiceParaMoverPC] == null){
        this.tracker[posibleIndiceParaMoverPC] = '0';
        this.cuadradosGrilla[posibleIndiceParaMoverPC].texto = '0';
        this.turnoUsuario = true;
        pcYaPusoCirculo = true;
      }
    }
  }
}
