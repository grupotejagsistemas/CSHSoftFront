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
import { Veterinaria } from '../voluntarios/veterinaria';

@Injectable({
  providedIn: 'root'
})
export class AdoptanteService {

  private urlAPI: string = environment.urlCSH; 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(this.urlAPI + '/mascotas');

  }

  getVeterinaria(): Observable<Veterinaria[]>{
    return this.http.get<Veterinaria[]>(`${this.urlAPI}/veterinaria`);
  }
  
  getAdoptantes(): Observable<Adoptante[]> {
    return this.http.get<Adoptante[]>(`${this.urlAPI}/adoptante`)
  }

  getAdoptanteNombre(nombre: any): Observable<Adoptante[]>{
    return this.http.get<Adoptante[]>(`${this.urlAPI}/adoptante/filtrarNombre?nombre=${nombre}`);
  }

  crearAdoptante(adoptante: any): Observable<any>{
    return this.http.post<any>(`${this.urlAPI}/adoptante`, adoptante);
  }

  modificarAdoptante(adoptante: any, id: number ): Observable<Adoptante>{
    return this.http.put<Adoptante>(`${this.urlAPI}/adoptante/${id}`, adoptante)
  }

  getAdoptante(id: number): Observable<Adoptante>{
    return this.http.get<Adoptante>(`${this.urlAPI}/adoptante/${id}`);
  }

  filtrarApto(apto: string) {
    return this.http.get(`${this.urlAPI}/adoptante/filtrarEstado?estado=${apto}`);
  }

  filtrarNoApto(noApto: string){
    return this.http.get(`${this.urlAPI}/adoptante/filtrarEstado?estado=${noApto}`);
  }

  filtrarEnProceso(enProceso: string){
    return this.http.get(`${this.urlAPI}/adoptante/filtrarEstado?estado=${enProceso}`);
  }

  filtrarRechazado(rechazado: string) {
    return this.http.get(`${this.urlAPI}/adoptante/filtrarEstado?estado=${rechazado}`);
  }

  filtrarFinalizado(finalizado: string){
    return this.http.get(`${this.urlAPI}/adoptante/filtrarEstado?estado=${finalizado}`);
  }
}
