import { Injectable } from '@angular/core';
import {FICHAMEDICA} from './ficha-medica.json';
import { FichaMedica } from './ficha-medica';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  private url: string = 'http://localhost:8080/api/fichas-medicas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getFichasMedicas(): Observable<FichaMedica[]> {
    return of(FICHAMEDICA);
    //  return this.http.get(this.url).pipe(
     //   map(response => response as FichaMedica[])
     // );
  }

  create(fichaMedica: FichaMedica) : Observable<FichaMedica>{
    return this.http.post(this.url, fichaMedica, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.fichaMedica as FichaMedica),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al crear al ficha médica', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getFichaMedica(id): Observable<FichaMedica>{
    return this.http.get<FichaMedica>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/fichas-medicas']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(fichaMedica: FichaMedica): Observable<any>{
    return this.http.put<any>(`${this.url}/${fichaMedica.id}`, fichaMedica, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar al ficha médica', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<FichaMedica>{
    return this.http.delete<FichaMedica>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar al ficha médica', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }
}
