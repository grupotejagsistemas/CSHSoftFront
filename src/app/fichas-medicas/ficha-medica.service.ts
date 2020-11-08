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

  constructor(
        private http: HttpClient, 
        private router: Router,
        private route: ActivatedRoute) {}

    getFichasMedicas(): Observable<FichaMedica[]>{
        return this.http.get<FichaMedica[]>(`${this.urlAPI}/fichasMedicas`)
    }

    getMascotas(): Observable<Mascota[]>{
      return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`)
    }

    getVeterinarias(): Observable<Veterinaria[]>{
      return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria`)
    }

    getFichaMedica(id: number): Observable<FichaMedica>{
      return this.http.get<FichaMedica>(`${this.urlAPI}/fichasMedicas/${id}`)
    }
    crearFichaMedica(fichaMedica: any) {
      return this.http.post(`${this.urlAPI}/fichasMedicas`, fichaMedica)
    }

    modificarFichaMedica(fichaMedica: any){
      return this.http.put(`${this.urlAPI}/fichasMedicas/${fichaMedica.id}`, fichaMedica)
    }

    borrarFichasMedicas(id: number) {
      return this.http.delete(`${this.urlAPI}/fichasMedicas/${id}`)
    }

    exportPdfProducts(id: number): Observable<Blob>{
      return this.http.get(`${this.urlAPI}/fichasMedicas/export/pdf/${id}`, {responseType: 'blob'})
    }
}
