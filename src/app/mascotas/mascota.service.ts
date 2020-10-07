import { Injectable } from '@angular/core';
//import {MASCOTAS} from './mascotas.json';
import { Mascota } from './mascota';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private url: string = 'http://localhost:8080/api/mascotas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getMascotas(): Observable<Mascota[]> {
    //return of(MASCOTAS);
      return this.http.get(this.url).pipe(
       map(response => response as Mascota[])
     );
  }

  /*create(mascota: Mascota) : Observable<Mascota>{
    return this.http.post(this.url, mascota, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.mascota as Mascota),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al ingresar una mascota', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getMascota(id): Observable<Mascota>{
    return this.http.get<Mascota>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/mascotas']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(mascota: Mascota): Observable<any>{
    return this.http.put<any>(`${this.url}/${mascota.id}`, mascota, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar la mascota', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Mascota>{
    return this.http.delete<Mascota>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar la mascota', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }*/
}