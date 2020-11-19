import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoAdoptante } from '../adoptantes/estado-adoptante';
import { Adoptante } from '../contratos/adoptante';
import { EntrevistaAdoptante } from './entrevista-adoptante';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaAdoptanteService {

  private urlAPI: string = environment.urlCSH;

  constructor(private http: HttpClient, private router: Router) { }

  getEntrevistas(): Observable<EntrevistaAdoptante[]>{
    return this.http.get<EntrevistaAdoptante[]>(`${this.urlAPI}/entrevistaadoptantes`);
  }

  getEntrevista(id: number): Observable<EntrevistaAdoptante>{
    return this.http.get<EntrevistaAdoptante>(`${this.urlAPI}/entrevistaadoptantes/${id}`);
  }

  crearEntrevista(entrevista: any) {
    return this.http.post(`${this.urlAPI}/entrevistaadoptantes`, entrevista);
  }

  modificarEntrevista(entrevista: any, id: number) {
    return this.http.put(`${this.urlAPI}/entrevistaadoptantes/${id}`, entrevista);
  }

  getAdoptantes(): Observable<Adoptante>{
    return this.http.get<Adoptante>(`${this.urlAPI}/adoptante`);
  }
  
  getAdoptanteNombre(nombre: any): Observable<EntrevistaAdoptante[]>{
    return this.http.get<EntrevistaAdoptante[]>(`${this.urlAPI}/entrevistaadoptantes/filtrar?nombre=${nombre}`);

  }
}
