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

  constructor() { }

  ngOnInit() {
    this.palabraSecreta = this.palabrasParaAdivinar[Math.floor(Math.random() * this.palabrasParaAdivinar.length + 1)];

    let arrayDeCaracteresOrdenados = [...this.palabraSecreta];

    this.palabraSecretaMezclada = arrayDeCaracteresOrdenados
    .map((a) => ({sort: Math.random(), value: a}))//Le agrego una key numerica aleatoria
    .sort((a, b) => a.sort - b.sort) //Las ordeno de menor a mayor
    .map((a) => a.value)//Hago una copia de los value al array nuevo
    .toString().replace(/[\,]/gm, " ");
    // console.log('GANASTE!!!');
  }

  verificar(){
    // let indiceRandom = Math.floor(Math.random() * arrayDeCaracteres.length + 1)
    // console.log(arrayDeCaracteres);
    // console.log('Tam array: '+ arrayDeCaracteres.length);
    // console.log('random: ' + indiceRandom);
    // console.log(this.palabrasParaAdivinar);
    if(this.palabraIngresada == this.palabraSecreta){
      alert('GANASTE!!!');
    } else {
      alert('Ah pero sos malisima!!');
    }
  }
}
