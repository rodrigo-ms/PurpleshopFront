import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private authService: AuthService,
    private userService:UsuarioService,

    private router: Router
 
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
      const response = await this.authService.login(this.formLogin.value);
      console.log(response);
  
      // Redirecciona a la página principal
      this.router.navigate(['/']);
  
      // Muestra una alerta de inicio de sesión exitoso
      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido de nuevo!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error(error);
  
      // Muestra una alerta de credenciales inválidas
      Swal.fire({
        title: 'Error de inicio de sesión',
        text: 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  async onClick() {
    try {
      const response = await this.authService.loginWithGoogle();
      console.log(response);
  
      const userInfo = this.authService.getUserInfo();
  
      if (userInfo) {
        // Obtener el usuario de la base de datos
        const userFromDB = await this.userService.getUserById(userInfo.uid);
  
        if (userFromDB) {
          // Verificar si el usuario no es de tipo "admin"
          if (userFromDB.tipoUsuario !== 'admin') {
            // Asignar el tipo "cliente"
            this.userService.saveUser(userInfo.uid, userInfo.email ?? '', 'cliente');
            this.router.navigate(['/']);
  
            // Muestra una alerta de inicio de sesión exitoso con Google
            Swal.fire({
              title: 'Inicio de sesión exitoso',
              text: '¡Bienvenido de nuevo con Google!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });// Asignar el tipo "cliente"
            this.userService.saveUser(userInfo.uid, userInfo.email ?? '', 'administrador');
            this.router.navigate(['/']);
  
            // Muestra una alerta de inicio de sesión exitoso con Google
            Swal.fire({
              title: 'Inicio de sesión exitoso',
              text: '¡Bienvenido de nuevo con Google!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }
        } else {
          // Puedes manejar el caso en el que no se puede obtener la información del usuario de la base de datos
          console.error('No se pudo obtener la información del usuario desde la base de datos después de iniciar sesión con Google.');
  
          // Muestra una alerta de error al iniciar sesión con Google
          Swal.fire({
            title: 'Error al iniciar sesión con Google',
            text: 'No se pudo obtener la información del usuario. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      }
    } catch (error) {
      console.error(error);
  
      // Muestra una alerta de error al iniciar sesión con Google
      Swal.fire({
        title: 'Error al iniciar sesión con Google',
        text: 'Ocurrió un error al intentar iniciar sesión con Google. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  
  
}
