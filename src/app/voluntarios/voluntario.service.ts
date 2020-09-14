import { Injectable } from '@angular/core';
import {VOLUNTARIOS} from './voluntarios.json';
import { Voluntario } from './voluntario';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  private url: string = 'http://localhost:8080/api/voluntarios';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getVoluntarios(): Observable<Voluntario[]> {
    return of(VOLUNTARIOS);
    //  return this.http.get(this.url).pipe(
     //   map(response => response as Voluntario[])
     // );
  }

  create(voluntario: Voluntario) : Observable<Voluntario>{
    return this.http.post(this.url, voluntario, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.voluntario as Voluntario),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al crear al voluntario', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getVoluntario(id): Observable<Voluntario>{
    return this.http.get<Voluntario>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/voluntarios']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(voluntario: Voluntario): Observable<any>{
    return this.http.put<any>(`${this.url}/${voluntario.id}`, voluntario, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar al voluntario', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Voluntario>{
    return this.http.delete<Voluntario>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar al voluntario', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }
}
