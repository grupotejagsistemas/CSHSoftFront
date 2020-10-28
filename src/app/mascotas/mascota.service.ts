import { Injectable } from '@angular/core';
import { Mascota } from './mascota';
import { EstadoMascota } from './estadoMascota';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private urlAPI: string = environment.urlCSH;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
    if(e.status == 401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getEstados(): Observable<EstadoMascota[]> {
    return this.http.get<EstadoMascota[]>(`${this.urlAPI}/estadoMascota`)
  }
 

  getMascotasNombre(nombre: any): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas/filtrar?nombre=${nombre}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    );
  }

  crearMascota(mascota: any) {
    return this.http.post(`${this.urlAPI}/mascotas`, mascota).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e)
        }
      })
    );

  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.urlAPI}/mascotas/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  modificarMascota(mascota: any){
    return this.http.put(`${this.urlAPI}/mascotas/${mascota.id}`, mascota).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  borrarMascota(id: number){ 
    return this.http.delete(`${this.urlAPI}/mascotas/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
  
  filtroMascotaMacho(sexo: string){
    return this.http.get(`${this.urlAPI}/mascotas/filtrarSexo?sexo=${sexo}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  filtroMascotaHembra(sexo: string){ 
    return this.http.get(`${this.urlAPI}/mascotas/filtrarSexo?sexo=${sexo}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  subirFoto(file: File, id): Observable<Mascota>{

    let formData = new FormData();
    
    formData.append("file", file);
    formData.append('id', id);

    return this.http.post(`${this.urlAPI}/mascotas/upload`, formData).pipe(
      map((resp: any) => resp.mascota as Mascota),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
}
