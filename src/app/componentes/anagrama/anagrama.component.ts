import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama'

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})

export class AnagramaComponent implements OnInit {

  palabrasParaAdivinar = [
    'palabra',
    'murcielago',
    'hipopotamo',
    'avena',
    'luciernaga',
    'escorpion',
    'ventana',
    'heladera',
    'alergia',
    'alegria',
    'cascara',
    'estante',
    'subsuelo'
  ];
  palabraSecreta: string = '';
  palabraSecretaMezclada: string = '';
  palabraIngresada: string = '';
  mensajeAlUsuario: boolean = false;
  gano: boolean = false;
  temporizador: any;
  tiempo: any = 3;

  constructor() { }

  ngOnInit() {
  }

  nuevoJuego(){
    this.gano = false;
    this.palabraSecreta = this.palabrasParaAdivinar[Math.floor(Math.random() * this.palabrasParaAdivinar.length + 1)];

    let arrayDeCaracteresOrdenados = [...this.palabraSecreta];

    this.palabraSecretaMezclada = arrayDeCaracteresOrdenados
    .map((a) => ({sort: Math.random(), value: a}))//Le agrego una key numerica aleatoria
    .sort((a, b) => a.sort - b.sort) //Las ordeno de menor a mayor
    .map((a) => a.value)//Hago una copia de los value al array nuevo
    .toString().replace(/[\,]/gm, " ");

  }

  verificar(){
    if(this.palabraIngresada.toLowerCase() == this.palabraSecreta.toLowerCase()){
      this.gano = true;
    } else {
      this.mensajeAlUsuario = true;
      this.temporizador = setInterval(() => {//Comienza a correr el tiempo
        this.tiempo--;
        console.log("tiempo: ", this.tiempo);
        if (this.tiempo == 0) {
          clearInterval(this.temporizador);//Borro el contador
          this.tiempo = 3;
          this.mensajeAlUsuario = false;
        }
      }, 900);
    }
  }
}
