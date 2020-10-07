import { Injectable } from '@angular/core';
import { FichaMedica } from './ficha-medica';
import {Mascota } from './mascota';
import {Veterinaria} from './veterinaria';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  private urlAPI: string = environment.urlCSH;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getFichasMedicas(): Observable<FichaMedica[]> {
    return this.http.get<FichaMedica[]>(`${this.urlAPI}/fichasMedicas`)
  }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`);
  }

  getVeterinaria(): Observable<Veterinaria[]>{
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinarias`);
  }
/*
  create(fichaMedica: FichaMedica) : Observable<FichaMedica>{
    return this.http.post(this.urlAPI, fichaMedica, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.fichaMedica as FichaMedica),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al crear al ficha médica', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }*/ 

  getFichaMedica(id): Observable<FichaMedica>{
    return this.http.get<FichaMedica>(`${this.urlAPI}/fichas-medicas/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/fichas-medicas']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
/*
  update(fichaMedica: FichaMedica): Observable<any>{
    return this.http.put<any>(`${this.urlAPI}/fichas-medicas/${fichaMedica.id}`, fichaMedica, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar al ficha médica', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<FichaMedica>{
    return this.http.delete<FichaMedica>(`${this.urlAPI}/fichas-medicas/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar al ficha médica', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }*/
}
