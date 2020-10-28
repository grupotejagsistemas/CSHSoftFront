import { Injectable } from '@angular/core';
import { Voluntario } from './voluntario';
import { Veterinaria } from './veterinaria';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

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


  getVeterinarias(): Observable<Veterinaria[]> {
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getVoluntarios(): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  getVoluntariosNombre(nombre: any): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario/filtrar?nombre=${nombre}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  crearVoluntario(voluntario: any) {
    return this.http.post(`${this.urlAPI}/voluntario`, voluntario).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  } 

  getVoluntario(id: number): Observable<Voluntario>{
    return this.http.get<Voluntario>(`${this.urlAPI}/voluntario/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  modificarVoluntario(voluntario: any) {
    return this.http.put(`${this.urlAPI}/voluntario/${voluntario.id}`, voluntario).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
   }

  borrarVoluntario(id: number) {
     return this.http.delete(`${this.urlAPI}/voluntario/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
     );
  }

  filtrarPresencial(presencial: string){
    return this.http.get(`${this.urlAPI}/voluntario/filtrarvoluntarioptt?filtro=${presencial}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  filtrarTransito(transito: string){
    return this.http.get(`${this.urlAPI}/voluntario/filtrarvoluntarioptt?filtro=${transito}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  filtrarTraslado(traslado: string){
    return this.http.get(`${this.urlAPI}/voluntario/filtrarvoluntarioptt?filtro=${traslado}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
}
