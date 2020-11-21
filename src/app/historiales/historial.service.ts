import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from './mascota';
import { Voluntario } from './voluntario';
import { Historial } from './historial';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private urlAPI: string = environment.urlCSH;

  constructor(private http: HttpClient, private router: Router) { }



  getHistoriales(): Observable<Historial[]>{
    return this.http.get<Historial[]>(`${this.urlAPI}/historial`);
  }

  getHistorial(id: number): Observable<Historial> {

    return this.http.get<Historial>(`${this.urlAPI}/historial/${id}`);
  }
  
  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`);
  }

  getVoluntarios(): Observable<Voluntario[]>{
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario`);
  }

  getNombreMascota(nombreMascota: string){
    return this.http.get(`${this.urlAPI}/historial/filtrar?nombre=${nombreMascota}`);
  }
  
  crearHistorial(historial: any) {
    return this.http.post(`${this.urlAPI}/historial`, historial);
  }

  modificarHistorial(historial: any, id: number){
    return this.http.put(`${this.urlAPI}/historial/${id}`, historial);
  }

  borrarHistorial(id: number) {
    return this.http.delete(`${this.urlAPI}/historial/${id}`);
  }
}
