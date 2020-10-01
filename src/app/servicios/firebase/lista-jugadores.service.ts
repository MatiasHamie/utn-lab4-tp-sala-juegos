import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Jugador } from '../../clases/jugador';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListaJugadoresService {

  listaTodosLosJugadores: Jugador[];
  datosJugadorConectado: Jugador;
  emailJugadorConectado: string;

  constructor(private db: AngularFirestore, private serviceFirebaseLogin: AuthService) {
    this.inicializarDatosUsuarioConectado();
  }

  inicializarDatosUsuarioConectado(){
    this.serviceFirebaseLogin.getCurrentUser()
      .then(data => { return data.email })
      .then((email: string) => this.ObtenerUsuarioConectadoYSusDatos(email));
  }

  getAllPlayers(): Observable<Jugador[]> {
    return this.db.collection('jugadores')
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <Jugador>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as any
          }
        })
      }));
  }

  ObtenerUsuarioConectadoYSusDatos(email) {
    this.getAllPlayers().subscribe((data: Jugador[]) => {
      let aux = data.find(jugadorIterado => jugadorIterado.email === email);
      // console.log(aux);
      if (aux) {
        // console.log('jugador existente');
        this.datosJugadorConectado = aux;
      }
      else {
        console.log('Creando nuevo jugador');
        this.createPlayer(email);
      }
    });
  }

  gano() {
    // console.log(`Antes de Gano->${this.datosJugadorConectado.email}`, this.datosJugadorConectado.gano);
    this.datosJugadorConectado.gano++;
    // console.log(`Desp de Gano->${this.datosJugadorConectado.email}`, this.datosJugadorConectado.gano);
  }

  perdio() {
    this.datosJugadorConectado.perdio++;
  }

  updatePlayer() {
    this.db.collection('jugadores').doc(this.datosJugadorConectado.id).set(this.datosJugadorConectado);
    // console.log('desde update->',this.datosJugadorConectado.id);
  }

  createPlayer(email) {
    this.db.collection('jugadores').doc(this.db.createId()).set({
      email: email,
      gano: 0,
      perdio: 0
    })
  }

}

