import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../services/perfil';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  usuario_id: number = 0;
  nombre: string = '';
  apellido: string = '';
  edad: number | null = null;
  correo: string = '';
  telefono: string = '';
  mensaje: string = '';
  existePerfil: boolean = false;

  constructor(private perfilService: PerfilService) {}

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('usuario_id');

    if (idGuardado) {
      this.usuario_id = Number(idGuardado);
      this.cargarPerfil();
    }
  }

  cargarPerfil() {
    this.perfilService.obtenerPerfil(this.usuario_id).subscribe({
      next: (respuesta: any) => {
        console.log('Respuesta perfil:', respuesta);

        if (respuesta && respuesta.perfil && respuesta.perfil.id) {
          this.existePerfil = true;
          this.nombre = respuesta.perfil.nombre;
          this.apellido = respuesta.perfil.apellido;
          this.edad = respuesta.perfil.edad;
          this.correo = respuesta.perfil.correo;
          this.telefono = respuesta.perfil.telefono;
        } else {
          this.existePerfil = false;
        }
      },
      error: (error: any) => {
        console.error('Error al cargar perfil:', error);
        this.existePerfil = false;
      }
    });
  }

  guardarPerfil() {
    if (!this.nombre || !this.apellido || !this.edad || !this.correo || !this.telefono) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
    if (!correoValido) {
      this.mensaje = 'El correo no tiene formato válido';
      return;
    }

    if (isNaN(Number(this.edad))) {
      this.mensaje = 'La edad debe ser numérica';
      return;
    }

    if (!/^\d{8}$/.test(this.telefono)) {
      this.mensaje = 'El teléfono debe tener 8 dígitos';
      return;
    }

    const datos = {
      usuario_id: this.usuario_id,
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      correo: this.correo,
      telefono: this.telefono
    };

    if (this.existePerfil) {
      this.perfilService.actualizarPerfil(datos).subscribe({
        next: () => {
          this.mensaje = 'Perfil actualizado correctamente';
          this.existePerfil = true;
        },
        error: (error: any) => {
          this.mensaje = error?.error?.mensaje || 'Error al actualizar perfil';
        }
      });
    } else {
      this.perfilService.crearPerfil(datos).subscribe({
        next: () => {
          this.mensaje = 'Perfil creado correctamente';
          this.existePerfil = true;
        },
        error: (error: any) => {
          this.mensaje = error?.error?.mensaje || 'Error al crear perfil';
        }
      });
    }
  }
}