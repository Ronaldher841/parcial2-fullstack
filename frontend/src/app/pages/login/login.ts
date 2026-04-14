import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuarioCorreo: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {
    if (!this.usuarioCorreo || !this.password) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    this.authService.login({
      usuarioCorreo: this.usuarioCorreo,
      password: this.password
    }).subscribe({
      next: (respuesta: any) => {
        localStorage.setItem('usuario_id', String(respuesta.usuario.id));
        localStorage.setItem('usuario_nombre', respuesta.usuario.usuario);
        this.router.navigate(['/perfil']);
      },
      error: (error: any) => {
        this.mensaje = error?.error?.mensaje || 'Error al iniciar sesión';
      }
    });
  }
}