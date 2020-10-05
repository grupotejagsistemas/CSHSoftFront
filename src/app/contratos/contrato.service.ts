import { Injectable } from '@angular/core';
//import {CONTRATOS} from './contratos.json';
import { Contrato } from './contrato';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private url: string = 'http://localhost:8080/api/mascotas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router) { }

  getContratos(): Observable<Contrato[]> {
    //return of(CONTRATOS);
      return this.http.get(this.url).pipe(
       map(response => response as Contrato[])
     );
  }

  create(contrato: Contrato) : Observable<Contrato>{
    return this.http.post(this.url, contrato, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.contrato as Contrato),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al ingresar el contrato', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getContrato(id): Observable<Contrato>{
    return this.http.get<Contrato>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/contratos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(contrato: Contrato): Observable<any>{
    return this.http.put<any>(`${this.url}/${contrato.id}`, contrato, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar el contrato', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Contrato>{
    return this.http.delete<Contrato>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar el contrato', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }
}