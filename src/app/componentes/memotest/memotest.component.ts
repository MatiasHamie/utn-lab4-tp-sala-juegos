import { Component, OnInit } from '@angular/core';
import { ListaJugadoresService } from '../../servicios/firebase/lista-jugadores.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {
  arrayDeLetras: Array<string> = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
  valoresDeLasCartas: Array<MemotestItem> = [];
  contadorDeCartasSeleccionadas: number = 0;
  primerClickDelUsuario: MemotestItem;
  termino: boolean;
  empezo: boolean


  constructor(private serviceJugadores: ListaJugadoresService) { }

  ngOnInit(): void {
  }

  public NuevoJuego() {
    this.empezo = true
    this.termino = false

    // Mezclo las letras del array inicial
    let letrasDesordenadas = this.DesordenarLasLetras();

    // Inicializo el array con las letras mezcladas
    for (const caracter of letrasDesordenadas) {
      this.valoresDeLasCartas.push(new MemotestItem(caracter))
    }
  }

  private DesordenarLasLetras() {
    let letrasDesordenadas = [...this.arrayDeLetras]
    for (let i = letrasDesordenadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Formo pares de cartas en grupitos de array
      [letrasDesordenadas[i], letrasDesordenadas[j]] = [letrasDesordenadas[j], letrasDesordenadas[i]];
    }
    return letrasDesordenadas;
  }

  public onClick(item: MemotestItem) {
    this.flipCard(item)
  }
  private flipCard(item: MemotestItem) {
    this.contadorDeCartasSeleccionadas++

    if (this.contadorDeCartasSeleccionadas == 1 || this.contadorDeCartasSeleccionadas == 2) {
      item.flip = true;
      // console.log("flip",this.contadorDeCartasSeleccionadas)
    }
    if (this.contadorDeCartasSeleccionadas == 1) {
      this.primerClickDelUsuario = item
    }
    if (this.contadorDeCartasSeleccionadas == 2) {
      if (this.primerClickDelUsuario.letra == item.letra) {
        this.primerClickDelUsuario.isCorrect = true
        item.isCorrect = true
      }
      setTimeout(() => {
        this.girarCartasEquivocadas();
        this.contadorDeCartasSeleccionadas = 0
        this.termino = this.checktermino();
        if (this.termino) {
          this.serviceJugadores.gano();
          // alert("Ganaste "+this.score)
        }
      }, 1000);
    }
  }
  private checktermino(): boolean {
    let termino = true
    for (let index = 0; index < this.valoresDeLasCartas.length; index++) {
      const item = this.valoresDeLasCartas[index];
      if (!item.isCorrect) {
        termino = false;
      }
    }
    return termino
  }
  private girarCartasEquivocadas() {
    this.valoresDeLasCartas.forEach(item => {
      if (!item.isCorrect) {
        item.flip = false;
      }
    });
  }

  Reiniciar(){
    this.valoresDeLasCartas = [];
    this.NuevoJuego();
  }

}

export class MemotestItem {
  constructor(letra: string) {
    this.letra = letra
  }
  letra: string;
  flip: boolean;
  isCorrect: boolean = false
}
