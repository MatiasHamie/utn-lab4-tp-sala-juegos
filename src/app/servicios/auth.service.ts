import { Injectable } from '@angular/core';

import { User } from 'firebase'
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth"
import { first } from 'rxjs/internal/operators/first';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      return await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}

/*
  primero hacer:
  npm install -g firebase-tools
  npm install firebase @angular/fire

  segundo importar en el appModule:

  import { AngularFireModule } from "@angular/fire";
  import { AngularFireAuthModule } from "@angular/fire/auth";
  import { environment } from 'src/environments/environment';

   imports: [
     ...todos lo q ya estan declarados y lo de abajo
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
   ]

   tercero hacer este servicio..

   cuarto sigue en el register.component.ts
*/
