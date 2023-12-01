import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  userEmail: string | undefined;
  tipoUsuario: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}
  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

      if (isAuthenticated) {
        const userInfo = this.authService.getUserInfo();

        // Verificar si userInfo no es nulo antes de acceder a sus propiedades
        if (userInfo) {
          this.userEmail = userInfo.email || undefined;
          console.log(userInfo.uid);

          // Obtener el tipo de usuario usando el servicio de usuarios
          this.usuarioService.getUserById(userInfo.uid)
            .then(usuario => {
              if (usuario) {
                this.tipoUsuario = usuario.tipoUsuario;
              }
            });
        }
      }
    });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza el logout solo si el usuario confirma
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}