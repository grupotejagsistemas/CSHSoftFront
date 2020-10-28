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
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
    if(e.status == 401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }


  getHistoriales(): Observable<Historial[]>{
    return this.http.get<Historial[]>(`${this.urlAPI}/historial`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getHistorial(id: number): Observable<Historial> {
    console.log('por id', id);

    return this.http.get<Historial>(`${this.urlAPI}/historial/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
  
  getMascotas(): Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.urlAPI}/mascotas`);
  }

  getVoluntarios(): Observable<Voluntario[]>{
    return this.http.get<Voluntario[]>(`${this.urlAPI}/voluntario`);
  }

  getNombreMascota(nombreMascota: string){
    return this.http.get(`${this.urlAPI}/historial/filtrar?nombre=${nombreMascota}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
  
  crearHistorial(historial: any) {
    return this.http.post(`${this.urlAPI}/historial`, historial).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  modificarHistorial(historial: any){
    console.log('modificar', historial)
    return this.http.put(`${this.urlAPI}/historial/${historial.id}`, historial).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  borrarHistorial(id: number) {
    return this.http.delete(`${this.urlAPI}/historial/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }
}
