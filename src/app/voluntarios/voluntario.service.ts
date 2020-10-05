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

  getVeterinarias(): Observable<Veterinaria[]> {
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinarias`) 

  }

  getVoluntarios(): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario`);
  }

  getVoluntariosNombre(nombre: any): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario/filtrar?nombre=${nombre}`)
  }



  create(voluntario: Voluntario) : Observable<Voluntario>{
    return this.http.post(this.urlAPI, voluntario, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.voluntario as Voluntario),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al crear al voluntario', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getVoluntario(id): Observable<Voluntario>{
    return this.http.get<Voluntario>(`${this.urlAPI}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/voluntarios']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(voluntario: Voluntario): Observable<any>{
    return this.http.put<any>(`${this.urlAPI}/${voluntario.idVoluntario}`, voluntario, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar al voluntario', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): void{
      this.http.delete<Voluntario>(`${this.urlAPI}/voluntario/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar al voluntario', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }
}
