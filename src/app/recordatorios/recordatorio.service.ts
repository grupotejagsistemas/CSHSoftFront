import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recordatorio } from './recordatorio';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

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


  getRecordatorios(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(`${this.urlAPI}/recordatorio`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getRecordatorio(id: number): Observable<Recordatorio>{
    return this.http.get<Recordatorio>(`${this.urlAPI}/recordatorio/${id}`).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    )
  }

  crearRecordatorio(recordatorio: any){
    return this.http.post(`${this.urlAPI}/recordatorio`, recordatorio).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

  modificarRecordatorio(recordatorio: any){
    return this.http.put(`${this.urlAPI}/recordatorio/${recordatorio.idRecordatorio}`, recordatorio).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError;
        }
      })
    );
  }

}
