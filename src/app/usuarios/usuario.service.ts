import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlAPI: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlAPI}/admin/usuario`);
  }

  getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlAPI}/admin/usuario/${id}`);
  }

  crearUsuario(usuario: any) {
    return this.http.post(`${this.urlAPI}/admin/usuario`, usuario);
  }

  modificarTipoUsuario(usuario: any){
    return this.http.put(`${this.urlAPI}/admin/usuario/put`, usuario);
  }

  modificarContrasena(contrasena: any){
    return this.http.put(`${this.urlAPI}/admin/usuario`, contrasena);
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${this.urlAPI}/admin/usuario/${id}`);
  }
}
