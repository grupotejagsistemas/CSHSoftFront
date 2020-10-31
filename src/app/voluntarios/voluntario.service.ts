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



  constructor(private http: HttpClient, private router: Router) { }


  getVeterinarias(): Observable<Veterinaria[]> {
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria`);
  }

  getVoluntarios(): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario`);
  }

  getVoluntariosNombre(nombre: any): Observable<Voluntario[]> {
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario/filtrar?nombre=${nombre}`);
  }

  crearVoluntario(voluntario: any): Observable<any> {
    console.log('AGREGASERVICE', voluntario)
    return this.http.post<any>(`${this.urlAPI}/voluntario`, voluntario);
  } 

  getVoluntario(id: number): Observable<Voluntario>{
    console.log('idservice', id)
    return this.http.get<Voluntario>(`${this.urlAPI}/voluntario/${id}`);
  }

  modificarVoluntario(voluntarioObj: any, id: number) :Observable<any>{
    console.log('id', id);
    return this.http.put<any>(`${this.urlAPI}/voluntario/${id}`, voluntarioObj);
   }

  borrarVoluntario(id: number) {
     return this.http.delete(`${this.urlAPI}/voluntario/${id}`);
  }

  filtrarPresencial(presencial: string){
    return this.http.get(`${this.urlAPI}/voluntario/filtrarvoluntarioptt?filtro=${presencial}`);
  }

  filtrarTransito(transito: string){
    return this.http.get(`${this.urlAPI}/voluntario/filtrarvoluntarioptt?filtro=${transito}`);
  }

  filtrarTraslado(traslado: string){
    return this.http.get(`${this.urlAPI}/voluntario/filtrarvoluntarioptt?filtro=${traslado}`);
  }
}
