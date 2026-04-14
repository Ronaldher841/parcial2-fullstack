import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  obtenerPerfil(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil?usuario_id=${usuarioId}`);
  }

  crearPerfil(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/perfil`, datos);
  }

  actualizarPerfil(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil`, datos);
  }
}