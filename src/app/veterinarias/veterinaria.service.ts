import { Injectable } from '@angular/core';
import { Veterinaria } from './veterinaria';
import {of,  Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {

  private urlAPI: string = environment.urlCSH;
  
  constructor(private http: HttpClient, private router: Router) { }


  getVeterinarias(): Observable<Veterinaria[]> {
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria`);
  }

  getVeterinariasRazonSocial(razonSocial: any): Observable<Veterinaria[]> {
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria/filtrar?razonSocial=${razonSocial}`);
  }

  crearVeterinaria(veterinaria: Veterinaria) {
    return this.http.post(`${this.urlAPI}/veterinaria`, veterinaria);
  }

  getVeterinaria(id: number): Observable<Veterinaria>{
    return this.http.get<Veterinaria>(`${this.urlAPI}/veterinaria/${id}`);
  }

  modificarVeterinaria(veterinaria: Veterinaria) {
    return this.http.put(`${this.urlAPI}/veterinaria/${veterinaria.id}`, veterinaria);
  }

  borrarVeterinaria(id: number) {
    return this.http.delete(`${this.urlAPI}/veterinaria/${id}`);
 }

 filtrarInternacion(internacion: string){
   return this.http.get(`${this.urlAPI}/veterinaria/filtrarInternacion?internacion=${internacion}`);
 }

 filtrarNoInternacion(internacion: string){
   return this.http.get(`${this.urlAPI}/veterinaria/filtrarInternacion?internacion=${internacion}`);
 }
}
