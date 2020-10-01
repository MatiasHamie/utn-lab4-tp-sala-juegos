import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebase: AuthService) {

  }

  ngOnInit() {
  }

  onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user = this.firebase.login(email, password);
      if (user) {
        this.router.navigate(['/Principal']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  llenarCampos(){
    this.email = 'admin@admin.com';
    this.password = 'admin1234';
  }
}
