import { Injectable } from '@angular/core';
import { Adoptante } from './adoptante';
import {Mascota} from './mascota';
import {EstadoAdoptante} from './estado-adoptante';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdoptanteService {

  private urlAPI: string = environment.urlCSH; 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(this.urlAPI + '/mascota');
  }

  getEstadosAdoptante(): Observable<EstadoAdoptante[]> {
    return this.http.get<EstadoAdoptante[]>(this.urlAPI + '/estadoAdoptante');
  }
  getAdoptantes(): Observable<Adoptante[]> {
    return this.http.get<Adoptante[]>(`${this.urlAPI}/adoptantes`)
  }
  create(adoptante: Adoptante) : Observable<Adoptante>{
    return this.http.post(this.urlAPI, adoptante, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.adoptante as Adoptante),
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al crear al adoptante', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  } 

  getAdoptante(idAdoptante): Observable<Adoptante>{
    return this.http.get<Adoptante>(`${this.urlAPI}/${idAdoptante}`).pipe(
      catchError(e => {
        this.router.navigate(['/adoptantes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(adoptante: Adoptante): Observable<any>{
    return this.http.put<any>(`${this.urlAPI}/${adoptante.idAdoptante}`, adoptante, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al modificar al adoptante', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }

  delete(idAdoptante: number): Observable<Adoptante>{
    return this.http.delete<Adoptante>(`${this.urlAPI}/${idAdoptante}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire('Error al eliminar al adoptante', e.error.mensaje, 'error')
        return throwError(e);
      })
    )
  }


}
