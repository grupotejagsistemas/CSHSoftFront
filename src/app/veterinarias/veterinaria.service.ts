import { Injectable } from '@angular/core';
import { Veterinaria } from './veterinaria';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {

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

  getVeterinariasRazonSocial(razonSocial: any): Observable<Veterinaria[]> {
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria/filtrar?razonSocial=${razonSocial}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }

  crearVeterinaria(veterinaria: Veterinaria) {
    return this.http.post(`${this.urlAPI}/veterinaria`, veterinaria).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  getVeterinaria(id: number): Observable<Veterinaria>{
    return this.http.get<Veterinaria>(`${this.urlAPI}/veterinaria/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  modificarVeterinaria(veterinaria: Veterinaria) {
    return this.http.put(`${this.urlAPI}/veterinaria/${veterinaria.id}`, veterinaria).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  borrarVeterinaria(id: number) {
    return this.http.delete(`${this.urlAPI}/veterinaria/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
 }

 filtrarInternacion(internacion: string){
   return this.http.get(`${this.urlAPI}/veterinaria/filtrarInternacion?internacion=${internacion}`).pipe(
     catchError(e => {
       if(this.isNoAutorizado(e)){
         return throwError;
       }
     })
   );
 }

 filtrarNoInternacion(internacion: string){
   return this.http.get(`${this.urlAPI}/veterinaria/filtrarInternacion?internacion=${internacion}`).pipe(
     catchError(e => {
       if(this.isNoAutorizado(e)){
         return throwError;
       }
     })
   )
 }
 
}
