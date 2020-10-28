import { Injectable } from '@angular/core';
import { FichaMedica } from './ficha-medica';
import {Mascota } from './mascota';
import {Veterinaria} from './veterinaria';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  private urlAPI: string = environment.urlCSH; 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
        private http: HttpClient, 
        private router: Router,
        private route: ActivatedRoute) {}

        private isNoAutorizado(e): boolean {
          if(e.status == 401 || e.status==403){
            this.router.navigate(['/login'])
            return true;
          }
          return false;
        }
      
    getFichasMedicas(): Observable<FichaMedica[]>{
        return this.http.get<FichaMedica[]>(`${this.urlAPI}/fichasMedicas`).pipe(
          catchError(e => {
            this.isNoAutorizado(e);
            return throwError(e);
          })
        );
    }

    getMascotas(): Observable<Mascota[]>{
      return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`)
    }

    getVeterinarias(): Observable<Veterinaria[]>{
      return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria`)
    }

    getFichaMedica(id: number): Observable<FichaMedica>{
      return this.http.get<FichaMedica>(`${this.urlAPI}/fichasMedicas/${id}`).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError;
          }
        })
      );
      
    }
    crearFichaMedica(fichaMedica: any) {
      return this.http.post(`${this.urlAPI}/fichasMedicas`, fichaMedica).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError;
          }
        })
      )
    }

    modificarFichaMedica(fichaMedica: any){
      return this.http.put(`${this.urlAPI}/fichasMedicas/${fichaMedica.id}`, fichaMedica).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError;
          }
        })
      );
    }

    borrarFichasMedicas(id: number) {
      return this.http.delete(`${this.urlAPI}/fichasMedicas/${id}`).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError;
          }
        })
      );
    }
}
