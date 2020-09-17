import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  aceptoTerminos: boolean;
  mensaje: string = '';

  // No olvidar el import en appModule de:
  // import { ReactiveFormsModule } from '@angular/forms'

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    acepto: new FormControl('')
  })

  constructor(private firebaseService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  async onRegister(){
    // console.log('Form-> ', this.registerForm.value);
    // asi sacamos email y contraseña del form
    const {email, password, acepto} = this.registerForm.value;
    if (acepto) {
      try {
        this.aceptoTerminos = true;
        const user = await this.firebaseService.register(email, password);
        if (user) {
          this.router.navigate(['/Principal']);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('entro');
      this.aceptoTerminos = false;
    }
  }
}
