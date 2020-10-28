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

  private isNoAutorizado(e): boolean {
    if(e.status == 401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(this.urlAPI + '/mascota').pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getEstadosAdoptante(): Observable<EstadoAdoptante[]> {
    return this.http.get<EstadoAdoptante[]>(this.urlAPI + '/estadoAdoptante');
  }
  getAdoptantes(): Observable<Adoptante[]> {
    return this.http.get<Adoptante[]>(`${this.urlAPI}/adoptante`)
  }
 

}
