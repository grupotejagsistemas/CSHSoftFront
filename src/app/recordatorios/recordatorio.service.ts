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

  constructor(private http: HttpClient, private router: Router) { }


  getRecordatorios(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(`${this.urlAPI}/recordatorio`);
  }

  getRecordatorio(id: number): Observable<Recordatorio>{
    return this.http.get<Recordatorio>(`${this.urlAPI}/recordatorio/${id}`);
  }

  crearRecordatorio(recordatorio: any){
    return this.http.post(`${this.urlAPI}/recordatorio`, recordatorio);
  }

  modificarRecordatorio(recordatorio: any){
    return this.http.put(`${this.urlAPI}/recordatorio/${recordatorio.idRecordatorio}`, recordatorio);
  }

}
