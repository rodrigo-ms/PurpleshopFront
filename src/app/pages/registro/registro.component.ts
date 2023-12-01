import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  
  formReg: FormGroup;

  constructor(
    private authService: AuthService,
    private userService:UsuarioService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.formReg.value)
      .then(response => {
        // Verifica si el registro fue exitoso y muestra una alerta
        if (response && response.user) {
          Swal.fire({
            title: 'Registro exitoso',
            text: '¡Tu cuenta ha sido creada exitosamente!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
  
          const userInfo = this.authService.getUserInfo();
  
          // Verificación para asegurarse de que userInfo no sea null o undefined
          if (userInfo) {
            this.userService.saveUser(userInfo.uid, userInfo.email ?? '', 'cliente'); // Utiliza ?? para manejar null o undefined
            this.router.navigate(['/login']);
          }
        } else {
          // Muestra una alerta de error si el registro no fue exitoso
          Swal.fire({
            title: 'Error en el registro',
            text: 'Hubo un problema al intentar registrarte. Por favor, inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      })
      .catch(error => {
        // Muestra una alerta de error si hay algún error durante el registro
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al intentar registrarte. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
  
        console.error('Error durante el registro:', error);
      });
  }

  async onClick() {
    try {
      const response = await this.authService.loginWithGoogle();
      console.log(response);
  
      const userInfo = this.authService.getUserInfo();
  
      if (userInfo) {
        this.userService.saveUser(userInfo.uid, userInfo.email ?? '', 'cliente');
        this.router.navigate(['/']);
  
        // Muestra una alerta de inicio de sesión exitoso con Google
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo con Google!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      } else {
        // Puedes manejar el caso en el que no se puede obtener la información del usuario
        console.error('No se pudo obtener la información del usuario después de iniciar sesión con Google.');
  
        // Muestra una alerta de error al iniciar sesión con Google
        Swal.fire({
          title: 'Error al iniciar sesión con Google',
          text: 'No se pudo obtener la información del usuario. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
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
