import { Injectable } from '@angular/core';
import {VETERINARIAS} from './veterinarias.json';
import { Veterinaria } from './veterinaria';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {

  private url: string = 'http://localhost:8080/api/veterinarias';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getVeterinarias(): Observable<Veterinaria[]> {
    return of(VETERINARIAS);
      //return this.http.get(this.url).pipe(
       //map(response => response as Veterinaria[])
    // );
  }

  create(veterinaria: Veterinaria) : Observable<Veterinaria>{
    return this.http.post(this.url, veterinaria, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.veterinaria as Veterinaria),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al crear la veterinaria', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getVeterinaria(id): Observable<Veterinaria>{
    return this.http.get<Veterinaria>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/veterinarias']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(veterinaria: Veterinaria): Observable<any>{
    return this.http.put<any>(`${this.url}/${veterinaria.id}`, veterinaria, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar la veterinaria', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Veterinaria>{
    return this.http.delete<Veterinaria>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar la veterinaria', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }
}
