import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }
  async onSubmit() {
    try {
      const response = await this.userService.login(this.formLogin.value);
      console.log(response);
      this.router.navigate(['/']);
      this.toastr.success('Inicio de sesión exitoso', 'Éxito');
    } catch (error) {
      console.log(error);
      this.toastr.error('Credenciales inválidas', 'Error');
    }
  }

  async onClick() {
    try {
      const response = await this.userService.loginWithGoogle();
      console.log(response);
      this.router.navigate(['/']);
      this.toastr.success('Inicio de sesión exitoso con Google', 'Éxito');
    } catch (error) {
      console.log(error);
      this.toastr.error('Error al iniciar sesión con Google', 'Error');
    }
  }

}
