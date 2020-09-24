import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colormania',
  templateUrl: './colormania.component.html',
  styleUrls: ['./colormania.component.scss']
})
export class ColormaniaComponent implements OnInit {

  colorRandom: string;
  colorRandomBotones: string;
  coloresAElegir: string[];
  colorElegido: string;
  fondoRandomBotones: string[];
  indiceRandom: number;
  temporizador: any;
  tiempo: number;
  gano: boolean;
  perdio: boolean;
  comenzo: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.tiempo = 4;
    this.coloresAElegir = ['blue', 'yellow', 'red', 'green', 'black'];
    this.fondoRandomBotones =  ['purple', 'light-green', 'gray'];
  }

  onClick_getBgColor() {
    this.comenzo = true;

    this.colorRandom = this.coloresAElegir[Math.floor(Math.random() * this.coloresAElegir.length)];
    this.colorRandomBotones = this.fondoRandomBotones[Math.floor(Math.random() * this.fondoRandomBotones.length)];
    console.log('Color random botones: ',this.colorRandomBotones);
    this.temporizador = setInterval(() => {//Comienza a correr el tiempo
      this.tiempo--;
      console.log("tiempo: ", this.tiempo);
      if (this.tiempo == 0) {//Si llega a 0 verifico
        this.verificar(); //Verifico si lo q estaba puesto por el user estaba ok
      }
    }, 900);
  }

  verificar() {
    this.reiniciarTemporizador();
    console.log(this.colorElegido);
    if (this.colorElegido === this.colorRandom) {
      this.gano = true;
      console.log('gano');
      // alert('GANO');
    } else {
      this.perdio = true;
      console.log('perdio');
      // alert('PERDIO');
    }
    this.comenzo = false;
  }

  reiniciarTemporizador() {
    clearInterval(this.temporizador);//Borro el contador
    this.tiempo = 5;
  }
  reinicioGeneral() {
    clearInterval(this.temporizador);//Borro el contador
    this.tiempo = 5;
    this.gano = false;
    this.perdio = false;
    this.colorElegido = '';
    this.colorRandom = '';
    this.colorRandomBotones = '';
  }

  setColor(color){
    this.colorElegido = color;
    console.log('Color elegido por usuario: ', this.colorElegido);
  }
}
